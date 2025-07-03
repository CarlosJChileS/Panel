import React from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import '../Dashboard.css';

function overallLevel(alerts) {
  const vals = Object.values(alerts);
  if (vals.includes('ALTA')) return 'ALTA';
  if (vals.includes('MEDIA')) return 'MEDIA';
  return 'BAJA';
}
export default function Alerts() {
  const { weather, loading, error, search, city, setCity } = useWeather();

  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="alerts-title">
          <div className="search-box">
            <h2 id="alerts-title" className="search-box-title">Alertas</h2>
            <form
              className="city-form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                search(city);
              }}
            >
              <label htmlFor="alerts-city">Ciudad</label>
              <input
                id="alerts-city"
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
              aria-label="Alertas"
              style={{ marginTop: 16 }}
            >
              <h3 className="card-title">Resultados</h3>
              <div className="card-row"><span>Temperatura Óptima</span><span>{weather.alerts.temp}</span></div>
              <div className="card-row"><span>Viento Fuerte</span><span>{weather.alerts.wind}</span></div>
              <div className="card-row"><span>Humedad</span><span>{weather.alerts.humidity}</span></div>
              <div className="card-row"><span>Aire Contaminado</span><span>{weather.alerts.air}</span></div>
              <div className="card-row"><span>Índice AQI</span><span>{weather.alerts.aqi}</span></div>
              <div className="card-row"><span>Índice UAQI</span><span>{weather.air.uaqi}</span></div>
              <div className="card-row"><span>Categoría UAQI</span><span>{weather.air.uaqiCategory}</span></div>
              <div className="card-row"><span>Nivel general</span><span>{overallLevel(weather.alerts)}</span></div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
