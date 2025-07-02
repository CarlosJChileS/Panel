import React, { useState } from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import '../Dashboard.css';

export default function AirQuality() {
  const [city, setCity] = useState('');
  const { weather, loading, error, search } = useWeather();

  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="air-title">
          <div className="search-box">
            <h2 id="air-title" className="search-box-title">Calidad del Aire</h2>
            <form
              className="city-form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                search(city);
              }}
            >
              <label htmlFor="air-city">Ciudad</label>
              <input
                id="air-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej: Manta"
                required
              />
              <button type="submit">Consultar</button>
            </form>
            {loading && <p>Consultando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <article
              className="card"
              role="region"
              aria-label="Calidad del aire"
              style={{ marginTop: 16 }}
            >
              <h3 className="card-title">Resultados</h3>
              <div className="card-row"><span>Monóxido De Carbono</span><span>{weather.air.co}</span></div>
              <div className="card-row"><span>Dióxido De Nitrógeno</span><span>{weather.air.no2}</span></div>
              <div className="card-row"><span>Dióxido De Azufre</span><span>{weather.air.so2}</span></div>
              <div className="card-row"><span>Ozono</span><span>{weather.air.ozone}</span></div>
              <div className="card-row"><span>Partículas PM2.5</span><span>{weather.air.pm25}</span></div>
              <div className="card-row"><span>Partículas PM10</span><span>{weather.air.pm10}</span></div>
              <div className="card-row"><span>Amoniaco</span><span>{weather.air.nh3}</span></div>
              <div className="card-row"><span>Índice AQI</span><span>{weather.air.aqi}</span></div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
