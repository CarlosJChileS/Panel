import React from 'react';
import '../DashboardNew.css';
import { useWeather } from '../hooks/useWeather';
import Header from './Header';

export default function Dashboard() {
  const { weather, trend, loading, error, search, city, setCity } = useWeather();

  const metrics = [
    {
      title: 'Temperatura',
      value: weather.temperature || '-',
      subtitle: weather.extras.feelsLike ? `Sensación térmica: ${weather.extras.feelsLike}` : '',
      range:
        weather.extras.tempMin && weather.extras.tempMax
          ? `Rango: ${weather.extras.tempMin}–${weather.extras.tempMax}`
          : '',
      type: 'temperature',
    },
    {
      title: 'Calidad de Aire',
      value: weather.air.uaqi || weather.air.aqi || '-',
      subtitle: weather.air.uaqiCategory
        ? `Índice AQI · ${weather.air.uaqiCategory}`
        : 'Índice AQI',
      range: weather.air.pm25 ? `PM2.5: ${weather.air.pm25} µg/m³` : '',
      type: 'air',
    },
    {
      title: 'Calidad Agua',
      value: 'N/D',
      subtitle: 'No disponible',
      range: '',
      type: 'water',
    },
    {
      title: 'Viento',
      value: weather.wind || '-',
      subtitle: '',
      range: '',
      type: 'wind',
    },
  ];

  if (trend && trend.length >= 2 && metrics[0].value && metrics[0].value !== '-') {
    const current = parseFloat(metrics[0].value);
    const yesterday = parseFloat(trend[0].temp);
    if (!Number.isNaN(current) && !Number.isNaN(yesterday)) {
      const diff = (current - yesterday).toFixed(1);
      metrics[0].trend = `${diff >= 0 ? '+' : ''}${diff}°C vs ayer`;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  const lastUpdate = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="dashboard dashboard-bg">
      <Header />
      <main id="main-content" tabIndex="-1">
        <header className="dashboard-header">
          <h1>Estado Ambiental en Tiempo Real</h1>
          <div className="location">
            {city || 'Ubicación'} · Última actualización: Hoy {lastUpdate}
          </div>
        </header>

        <section className="metrics-grid">
          {metrics.map((m) => (
            <div key={m.title} className={`card card--${m.type}`}>
              <h2 className="card-title">{m.title}</h2>
              <div className="card-value">{m.value}</div>
              {m.subtitle && <div className="card-sub">{m.subtitle}</div>}
              {m.range && <div className="card-range">{m.range}</div>}
              {m.trend && <div className="card-range">{m.trend}</div>}
            </div>
          ))}
          <div className="card card--alert">
            <span className="alert-label">{weather.alerts?.temp || 'MODERADO'}</span>
            <p>Precaución recomendada</p>
          </div>
        </section>

        <section className="custom-query">
          <h2>Consulta Personalizada de Datos</h2>
          <div className="query-form">
            <input
              type="text"
              placeholder="Ubicación o Coordenadas"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <select>
              <option>Datos Completos</option>
              <option>Solo Aire</option>
              <option>Solo Agua</option>
            </select>
            <button onClick={handleSubmit}>Consultar Ahora</button>
          </div>
          {loading && <p>Consultando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>

        <section className="climate-conditions">
          <h2>Condiciones Climáticas</h2>
          <div className="conditions-grid">
            <div className="condition">
              <span className="cond-name">Humedad Relativa</span>
              <span className="cond-value">{weather.humidity || '-'}</span>
              <div className="cond-bar">
                <div style={{ width: `${parseFloat(weather.humidity) || 0}%` }} />
              </div>
            </div>
            <div className="condition">
              <span className="cond-name">Presión Atmosférica</span>
              <span className="cond-value">{weather.pressure || '-'}</span>
              <div className="cond-bar">
                <div style={{ width: '50%' }} />
              </div>
            </div>
            <div className="condition">
              <span className="cond-name">Visibilidad</span>
              <span className="cond-value">{weather.extras.visibility || '-'}</span>
              <div className="cond-bar">
                <div style={{ width: '90%' }} />
              </div>
            </div>
            <div className="condition">
              <span className="cond-name">Índice UV</span>
              <span className="cond-value">-</span>
              <div className="cond-bar">
                <div style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

