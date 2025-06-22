import { useState } from 'react';
import { initialWeather, mockWeather } from '../../domain/mockWeather';
import { fetchWeather, fetchForecast } from '../../infrastructure/openWeatherService';

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
      };
      merged.alerts = { ...mockWeather.alerts, ...computeAlerts(merged) };
      setTrend(forecast);
      setData(merged);
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
