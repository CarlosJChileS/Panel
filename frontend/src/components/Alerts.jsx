import React from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import './AlertModule.css';
import { FaExclamationTriangle, FaEye, FaTimesCircle } from 'react-icons/fa';

export default function Alerts() {
  const { weather, loading, error, search, city, setCity } = useWeather();

  const alertEntries = [
    { key: 'temp', title: 'Temperatura Óptima' },
    { key: 'wind', title: 'Viento Fuerte' },
    { key: 'humidity', title: 'Humedad' },
    { key: 'air', title: 'Aire Contaminado' },
    { key: 'uaqi', title: 'Índice UAQI' },
  ];

  const active = alertEntries
    .map((e) => ({ ...e, level: weather.alerts[e.key] }))
    .filter((a) => a.level && a.level !== 'BAJA');

  const moderateAlerts = active.filter((a) => a.level === 'MEDIA');
  const criticalAlerts = active.filter((a) => a.level === 'ALTA');

  const stats = [
    { label: 'Alertas Activas', value: active.length, type: 'active' },
    { label: 'Alertas Hoy', value: active.length, type: 'today' },
    { label: 'Estaciones Monit.', value: 1, type: 'stations' },
    { label: 'Tiempo de Respuesta', value: '<5min', type: 'response' },
  ];

  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="alerts-title">
          <div className="search-box">
            <h2 id="alerts-title" className="search-box-title">Sistema de Alertas Ambientales</h2>
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
            <div className="alert-module" style={{ marginTop: 16 }}>
              <header className="alerts-header">
                <div className="stats">
                  {stats.map((s) => (
                    <div key={s.type} className={`stat stat--${s.type}`}>
                      <span className="stat-value">{s.value}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </header>
              <div className="alerts-content">
                <section className="alerts-section alerts-section--moderate">
                  <h3>Alertas Moderadas</h3>
                  <div className="alerts-list">
                    {moderateAlerts.map((a, i) => (
                      <div key={i} className="alert-card alert-card--moderate">
                        <FaExclamationTriangle className="alert-icon" />
                        <div className="alert-info">
                          <strong>{a.title}</strong>
                          <span className="alert-location">Nivel {a.level}</span>
                        </div>
                        <span className="alert-tag">MODERADA</span>
                      </div>
                    ))}
                    {moderateAlerts.length === 0 && <p>No hay alertas moderadas</p>}
                  </div>
                </section>
                <section className="alerts-section alerts-section--critical">
                  <h3>Alertas Críticas</h3>
                  <div className="alerts-list">
                    {criticalAlerts.map((a, i) => (
                      <div key={i} className="alert-card alert-card--critical">
                        <FaExclamationTriangle className="alert-icon" />
                        <div className="alert-info">
                          <strong>{a.title}</strong>
                          <span className="alert-location">Nivel {a.level}</span>
                        </div>
                        <span className="alert-tag">CRÍTICA</span>
                        <div className="alert-actions">
                          <button title="Ver detalles">
                            <FaEye />
                          </button>
                          <button title="Cerrar alerta">
                            <FaTimesCircle />
                          </button>
                        </div>
                      </div>
                    ))}
                    {criticalAlerts.length === 0 && <p>No hay alertas críticas</p>}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
