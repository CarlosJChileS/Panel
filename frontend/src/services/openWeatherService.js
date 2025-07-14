export async function fetchWeather(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('weather');
  const data = await res.json();
  const base = {
    temperature: data.main ? `${Math.round(data.main.temp)}°C` : null,
    humidity: data.main ? `${data.main.humidity}%` : null,
    wind: data.wind ? `${data.wind.speed} m/s` : null,
    pressure: data.main ? `${data.main.pressure} hPa` : null,
    extras: {
      feelsLike: data.main ? `${Math.round(data.main.feels_like)}°C` : null,
      sky: data.weather && data.weather[0] ? data.weather[0].description : null,
      clouds: data.clouds ? `${data.clouds.all}%` : null,
      visibility: data.visibility ? `${data.visibility} m` : null,
      tempMin: data.main ? `${Math.round(data.main.temp_min)}°C` : null,
      tempMax: data.main ? `${Math.round(data.main.temp_max)}°C` : null,
      sunrise: data.sys ? new Date(data.sys.sunrise * 1000).toLocaleTimeString('es-ES') : null,
      sunset: data.sys ? new Date(data.sys.sunset * 1000).toLocaleTimeString('es-ES') : null,
    },
    lat: data.coord ? data.coord.lat : null,
    lon: data.coord ? data.coord.lon : null,
  };
  let air = {};
  try {
    if (data.coord) {
      const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
      const airRes = await fetch(airUrl);
      if (airRes.ok) {
        const airJson = await airRes.json();
        const { components, main } = airJson.list[0];
        air = {
          co: String(components.co),
          no2: String(components.no2),
          ozone: String(components.o3),
          so2: String(components.so2),
          pm25: String(components.pm2_5),
          pm10: String(components.pm10),
          nh3: String(components.nh3),
          aqi: String(main.aqi),
        };
      }
    }
  } catch (e) {
    // ignore air errors
  }
  return { ...base, air };
}

export async function fetchForecast(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('forecast');
  const json = await res.json();
  return json.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleDateString('es-ES'),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    wind: item.wind.speed,
  }));
}

export async function fetchAirForecast(lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('air forecast');
  const json = await res.json();
  return json.list.slice(0, 24).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('es-ES', { hour: '2-digit' }),
    co: item.components.co,
    no2: item.components.no2,
    o3: item.components.o3,
    pm2_5: item.components.pm2_5,
    pm10: item.components.pm10,
  }));
}
