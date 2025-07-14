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
              <ul>
                <li>Sensación térmica: <b>{weather.extras.feelsLike}</b></li>
                <li>Estado del cielo: <b>{weather.extras.sky}</b></li>
                <li>Nubosidad: <b>{weather.extras.clouds}</b></li>
                <li>Visibilidad: <b>{weather.extras.visibility}</b></li>
                <li>Temp. mínima: <b>{weather.extras.tempMin}</b></li>
                <li>Temp. máxima: <b>{weather.extras.tempMax}</b></li>
                <li>Amanecer: <b>{weather.extras.sunrise}</b></li>
                <li>Atardecer: <b>{weather.extras.sunset}</b></li>
                <li>Presión atmosférica: <b>{weather.pressure}</b></li>
                <li>Humedad: <b>{weather.humidity}</b></li>
                <li>Viento: <b>{weather.wind}</b></li>
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
