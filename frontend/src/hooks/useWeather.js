import { useState } from 'react';
import { initialWeather, mockWeather } from '../data/mockWeather';
import { fetchWeather, fetchForecast } from '../services/openWeatherService';
import { supabase } from '../services/supabaseClient';

function parseNum(value) {
  const n = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isNaN(n) ? null : n;
}

function computeAlerts(w) {
  const alerts = {};
  if (w.temperature) {
    const t = parseFloat(w.temperature);
    alerts.temp = t > 30 ? 'ALTA' : t > 20 ? 'MEDIA' : 'BAJA';
  }
  if (w.wind) {
    const v = parseFloat(w.wind);
    alerts.wind = v > 10 ? 'ALTA' : v > 5 ? 'MEDIA' : 'BAJA';
  }
  if (w.humidity) {
    const h = parseFloat(w.humidity);
    alerts.humidity = h > 80 ? 'ALTA' : h > 60 ? 'MEDIA' : 'BAJA';
  }
  if (w.air && w.air.pm25) {
    const pm = parseFloat(w.air.pm25);
    alerts.air = pm > 35 ? 'ALTA' : pm > 12 ? 'MEDIA' : 'BAJA';
  }
  if (w.air && w.air.aqi) {
    const aqi = parseFloat(w.air.aqi);
    alerts.aqi = aqi > 3 ? 'ALTA' : aqi > 2 ? 'MEDIA' : 'BAJA';
  }
  return alerts;
}

export function useWeather() {
  const [data, setData] = useState(initialWeather);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
      const real = await fetchWeather(city, apiKey);
      let forecast = [];
      try {
        forecast = await fetchForecast(city, apiKey);
      } catch (_) {
        // ignore forecast errors
      }
      const merged = {
        ...mockWeather,
        ...real,
        air: { ...mockWeather.air, ...real.air },
        extras: { ...mockWeather.extras, ...(real.extras || {}) },
      };
      merged.alerts = { ...mockWeather.alerts, ...computeAlerts(merged) };
      setTrend(forecast);
      setData(merged);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let cityId;
        const { data: cityRow } = await supabase
          .from('cities')
          .select('id')
          .eq('name', city)
          .single();
        if (cityRow) {
          cityId = cityRow.id;
        } else {
          const { data: newCity } = await supabase
            .from('cities')
            .insert({ name: city, lat: parseNum(merged.lat), lon: parseNum(merged.lon) })
            .select('id')
            .single();
          cityId = newCity?.id;
        }
        const { data: consult } = await supabase
          .from('consults')
          .insert({ user_id: user.id, city_id: cityId })
          .select('id')
          .single();
        const consultId = consult?.id;
        if (consultId) {
          await supabase.from('weather_conditions').insert({
            consult_id: consultId,
            temperatura: parseNum(merged.temperature),
            humedad: parseNum(merged.humidity),
            viento: parseNum(merged.wind),
            presion_atmosferica: parseNum(merged.pressure),
          });
          await supabase.from('air_quality').insert({
            consult_id: consultId,
            monoxido_de_carbono: parseNum(merged.air.co),
            dioxido_de_nitrogeno: parseNum(merged.air.no2),
            ozono: parseNum(merged.air.ozone),
            particulas_pm25: parseNum(merged.air.pm25),
          });
          await supabase.from('additional_conditions').insert({
            consult_id: consultId,
            sensacion_termica: parseNum(merged.extras.feelsLike),
            estado_del_cielo: merged.extras.sky,
            nubosidad: parseNum(merged.extras.clouds),
            visibilidad: parseNum(merged.extras.visibility),
          });
          const alertRows = Object.entries(merged.alerts).map(([k, v]) => ({
            consult_id: consultId,
            alerta: `${k}:${v}`,
          }));
          await supabase.from('alerts').insert(alertRows);
        }
      }
      setError(null);
    } catch (e) {
      setError('No se pudo obtener datos');
      setTrend([]);
      setData(mockWeather);
    } finally {
      setLoading(false);
    }
  };

  return { weather: data, trend, loading, error, search };
}
