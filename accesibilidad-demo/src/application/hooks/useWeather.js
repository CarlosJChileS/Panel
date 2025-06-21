import { useState } from 'react';
import { mockWeather } from '../../domain/mockWeather';
import { fetchWeather } from '../../infrastructure/openWeatherService';

export function useWeather() {
  const [data, setData] = useState(mockWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
      const real = await fetchWeather(city, apiKey);
      const merged = {
        ...mockWeather,
        ...real,
        air: { ...mockWeather.air, ...real.air },
      };
      setData(merged);
      setError(null);
    } catch (e) {
      setError('No se pudo obtener datos');
      setData(mockWeather);
    } finally {
      setLoading(false);
    }
  };

  return { weather: data, loading, error, search };
}
