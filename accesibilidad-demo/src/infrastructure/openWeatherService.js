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
  };
  let air = {};
  try {
    if (data.coord) {
      const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
      const airRes = await fetch(airUrl);
      if (airRes.ok) {
        const airJson = await airRes.json();
        const comp = airJson.list[0].components;
        air = {
          co: String(comp.co),
          no2: String(comp.no2),
          ozone: String(comp.o3),
          pm25: String(comp.pm2_5),
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
  return json.list.slice(0, 5).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleDateString('es-ES'),
    temp: Math.round(item.main.temp),
  }));
}
