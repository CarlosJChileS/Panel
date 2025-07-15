import React, { useState, useContext, createContext } from 'react';
import { initialWeather, mockWeather } from '../data/mockWeather';
import { fetchWeather, fetchForecast, fetchAirForecast } from '../services/openWeatherService';
import { fetchGoogleAirQuality } from '../services/googleAirService';
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
  if (w.air && w.air.uaqi) {
    const u = parseFloat(w.air.uaqi);
    alerts.uaqi = u > 100 ? 'ALTA' : u > 50 ? 'MEDIA' : 'BAJA';
  }
  return alerts;
}

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [data, setData] = useState(initialWeather);
  const [trend, setTrend] = useState([]);
  const [airTrend, setAirTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('weather_history')) || [];
    } catch {
      return [];
    }
  });

  const editHistoryEntry = (index, newValue) => {
    setHistory((h) => {
      const updated = [...h];
      updated[index] = newValue;
      localStorage.setItem('weather_history', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHistoryEntry = (index) => {
    setHistory((h) => {
      const updated = h.filter((_, i) => i !== index);
      localStorage.setItem('weather_history', JSON.stringify(updated));
      return updated;
    });
  };

  const search = async (newCity) => {
    const cityToSearch = newCity ?? city;
    if (!cityToSearch) return;
    setCity(cityToSearch);
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
      const googleKey = process.env.REACT_APP_GOOGLEAIR_KEY;
      const real = await fetchWeather(cityToSearch, apiKey);
      let forecast = [];
      let airForecast = [];
      try {
        forecast = await fetchForecast(cityToSearch, apiKey);
      } catch (_) {
        // ignore forecast errors
      }
      try {
        if (real.lat && real.lon) {
          airForecast = await fetchAirForecast(real.lat, real.lon, apiKey);
        }
      } catch (_) {
        // ignore air forecast errors
      }
      const merged = {
        ...mockWeather,
        ...real,
        air: { ...mockWeather.air, ...real.air },
        extras: { ...mockWeather.extras, ...(real.extras || {}) },
      };
      if (googleKey && merged.lat && merged.lon) {
        try {
          const gAir = await fetchGoogleAirQuality(merged.lat, merged.lon, googleKey);
          merged.air = { ...merged.air, ...gAir };
        } catch (_) {
          // ignore google air errors
        }
      }
      merged.alerts = { ...mockWeather.alerts, ...computeAlerts(merged) };
      setTrend(forecast);
      setAirTrend(airForecast);
      setData(merged);
      setHistory((h) => {
        const newHist = [cityToSearch, ...h.filter((c) => c !== cityToSearch)].slice(0, 5);
        localStorage.setItem('weather_history', JSON.stringify(newHist));
        return newHist;
      });
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let cityId;
        const { data: cityRow } = await supabase
          .from('cities')
          .select('id')
          .eq('name', cityToSearch)
          .single();
        if (cityRow) {
          cityId = cityRow.id;
        } else {
          const { data: newCity } = await supabase
            .from('cities')
            .insert({ name: cityToSearch, lat: parseNum(merged.lat), lon: parseNum(merged.lon) })
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
      setAirTrend([]);
      setData(mockWeather);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weather: data,
        trend,
        airTrend,
        loading,
        error,
        search,
        city,
        setCity,
        history,
        editHistoryEntry,
        deleteHistoryEntry,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
