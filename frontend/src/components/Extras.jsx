import React from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import ExtrasChart from './ExtrasChart';
import { mockTrend } from '../data/mockWeather';
import './AirQualityDashboard.css';

export default function Extras() {
  const { weather, trend, loading, error, search, city, setCity } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  const data = trend.length ? trend : mockTrend;

  return (
    <div className="aq-dashboard-container">
      <Header />
      <main className="aq-main-content" id="main-content" tabIndex="-1">
        <section className="aq-consulta-panel" aria-label="Consulta de ubicación">
          <form className="aq-form-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ciudad"
              aria-label="Ciudad"
              required
            />
            <button type="submit" className="aq-btn-aplicar">Aplicar</button>
            <button type="button" className="aq-btn-exportar">Exportar</button>
          </form>
          {loading && <p>Consultando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
        <section className="aq-content-panels">
          <div className="aq-panel-izq">
            <div className="aq-card" aria-label="Condiciones adicionales">
              <div className="aq-card-header">Condiciones Adicionales</div>
              <ul className="aq-extras-list">
                <li>
                  <span>Sensación térmica</span>
                  <span className="aq-value">{weather.extras.feelsLike}</span>
                </li>
                <li>
                  <span>Estado del cielo</span>
                  <span className="aq-value">{weather.extras.sky}</span>
                </li>
                <li>
                  <span>Nubosidad</span>
                  <span className="aq-value">{weather.extras.clouds}</span>
                </li>
                <li>
                  <span>Visibilidad</span>
                  <span className="aq-value">{weather.extras.visibility}</span>
                </li>
                <li>
                  <span>Temp. mínima</span>
                  <span className="aq-value">{weather.extras.tempMin}</span>
                </li>
                <li>
                  <span>Temp. máxima</span>
                  <span className="aq-value">{weather.extras.tempMax}</span>
                </li>
                <li>
                  <span>Amanecer</span>
                  <span className="aq-value">{weather.extras.sunrise}</span>
                </li>
                <li>
                  <span>Atardecer</span>
                  <span className="aq-value">{weather.extras.sunset}</span>
                </li>
                <li>
                  <span>Presión atmosférica</span>
                  <span className="aq-value">{weather.pressure}</span>
                </li>
                <li>
                  <span>Humedad</span>
                  <span className="aq-value">{weather.humidity}</span>
                </li>
                <li>
                  <span>Viento</span>
                  <span className="aq-value">{weather.wind}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="aq-panel-der">
            <div className="aq-card aq-evolucion">
              <div className="aq-card-header">Pronóstico</div>
              {data.length ? (
                <div className="aq-grafico">
                  <ExtrasChart data={data} />
                </div>
              ) : (
                <div className="aq-grafico-mock">
                  <div className="aq-grafico-icon">📈</div>
                  <div className="aq-grafico-txt">Gráfico de tendencia<br />Próximas horas</div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
