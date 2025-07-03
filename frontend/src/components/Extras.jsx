import React from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import '../Dashboard.css';

export default function Extras() {
  const { weather, loading, error, search, city, setCity } = useWeather();

  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="extras-title">
          <div className="search-box">
            <h2 id="extras-title" className="search-box-title">Condiciones Adicionales</h2>
            <form
              className="city-form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                search(city);
              }}
            >
              <label htmlFor="extras-city">Ciudad</label>
              <input
                id="extras-city"
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
              aria-label="Condiciones adicionales"
              style={{ marginTop: 16 }}
            >
              <h3 className="card-title">Resultados</h3>
              <div className="card-row"><span>Sensación térmica</span><span>{weather.extras.feelsLike}</span></div>
              <div className="card-row"><span>Estado del cielo</span><span>{weather.extras.sky}</span></div>
              <div className="card-row"><span>Nubosidad</span><span>{weather.extras.clouds}</span></div>
              <div className="card-row"><span>Visibilidad</span><span>{weather.extras.visibility}</span></div>
              <div className="card-row"><span>Temp. mínima</span><span>{weather.extras.tempMin}</span></div>
              <div className="card-row"><span>Temp. máxima</span><span>{weather.extras.tempMax}</span></div>
              <div className="card-row"><span>Amanecer</span><span>{weather.extras.sunrise}</span></div>
              <div className="card-row"><span>Atardecer</span><span>{weather.extras.sunset}</span></div>
              <div className="card-row"><span>Presión atmosférica</span><span>{weather.pressure}</span></div>
              <div className="card-row"><span>Humedad</span><span>{weather.humidity}</span></div>
              <div className="card-row"><span>Viento</span><span>{weather.wind}</span></div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
