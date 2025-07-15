import React, { useState, useMemo } from 'react';
import { useWeather } from '../hooks/useWeather';
import AirQualityChart from './AirQualityChart';
import './AirQualityDashboard.css';

const AQ_CATEGORY = [
  { label: 'Buena', max: 50 },
  { label: 'Moderada', max: 100 },
  { label: 'Mala', max: 150 },
  { label: 'Muy Mala', max: Infinity },
];

export default function AirQualityDashboard() {
  const { weather, airTrend, loading, error, search, city, setCity } = useWeather();
  const [pollutant, setPollutant] = useState('PM2.5');
  const [range, setRange] = useState('24h');

  const RANGE_LABELS = {
    '24h': 'Últimas 24 Horas',
    '7d': 'Última Semana',
    '1m': 'Último Mes',
    '1y': 'Último Año',
  };

  function expandTrend(data, r) {
    if (!data) return [];
    if (r === '24h') return data;
    const days = r === '7d' ? 7 : r === '1m' ? 30 : 365;
    const expanded = [];
    for (let i = 0; i < days; i++) {
      const src = data[i % data.length];
      expanded.push({ ...src, time: `D${i + 1}` });
    }
    return expanded;
  }

  const displayTrend = useMemo(() => expandTrend(airTrend, range), [airTrend, range]);

  const aqi = parseFloat(weather.air.uaqi || weather.air.aqi) || 0;
  const category = AQ_CATEGORY.find((c) => aqi <= c.max) || AQ_CATEGORY[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  const handleExport = () => {
    const rows = [
      ['Time', 'CO', 'NO2', 'O3', 'PM2.5', 'PM10'],
      ...displayTrend.map((d) => [d.time, d.co, d.no2, d.o3, d.pm2_5, d.pm10]),
    ];
    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `air_quality_${range}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="aq-dashboard-container">
      <header className="aq-header">
        <span className="aq-modulo-titulo">Módulo Calidad del Aire</span>
        <nav className="aq-navbar">
          <span className="aq-logo">🌎 Dashboard Ambiental</span>
          <ul>
            <li>Calidad Aire</li>
            <li>Calidad Agua</li>
            <li>Mapa</li>
            <li>Alertas</li>
          </ul>
          <div className="aq-user-controls">
            <button className="aq-btn">ES</button>
            <button className="aq-btn">⚙️</button>
          </div>
        </nav>
      </header>
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
            <select value={pollutant} onChange={(e) => setPollutant(e.target.value)}>
              <option>PM2.5</option>
              <option>PM10</option>
              <option>NO₂</option>
              <option>O₃</option>
              <option>CO</option>
            </select>
            <select value={range} onChange={(e) => setRange(e.target.value)}>
              <option value="24h">Últimas 24h</option>
              <option value="7d">Última semana</option>
              <option value="1m">Último mes</option>
              <option value="1y">Último año</option>
            </select>
            <button type="submit" className="aq-btn-aplicar">Aplicar</button>
            <button type="button" className="aq-btn-exportar" onClick={handleExport}>Exportar</button>
          </form>
          {loading && <p>Consultando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
        <section className="aq-content-panels">
          <div className="aq-panel-izq">
            <div className="aq-card aq-aire-index" aria-label="Índice de calidad del aire">
              <div className="aq-card-header">
                Índice de Calidad del Aire (AQI)
                <span className="aq-actualiza">Actualizado: {new Date().toLocaleTimeString('es-ES')}</span>
              </div>
              <div className="aq-aqi-value" aria-live="polite">{aqi}</div>
              <div className="aq-moderado">{category.label.toUpperCase()}</div>
              <div className="aq-precaucion">Precaución para grupos sensibles</div>
              <div className="aq-escala-ref">
                <div className="aq-escala-bar">
                  <span className="aq-escala verde" />
                  <span className="aq-escala amarillo" />
                  <span className="aq-escala naranja" />
                  <span className="aq-escala rojo" />
                </div>
                <div className="aq-escala-labels">
                  <span>Buena</span>
                  <span>Moderada</span>
                  <span>Mala</span>
                  <span>Muy Mala</span>
                </div>
              </div>
            </div>
            <div className="aq-card aq-contaminantes" aria-label="Contaminantes individuales">
              <div className="aq-card-header">Contaminantes Individuales</div>
              <ul>
                <li><b>PM2.5</b> <span className="aq-value red">{weather.air.pm25 || '-' } µg/m³</span></li>
                <li><b>PM10</b> <span className="aq-value orange">{weather.air.pm10 || '-'} µg/m³</span></li>
                <li><b>NO₂</b> <span className="aq-value yellow">{weather.air.no2 || '-'} µg/m³</span></li>
                <li><b>O₃</b> <span className="aq-value green">{weather.air.ozone || '-'} µg/m³</span></li>
                <li><b>CO</b> <span className="aq-value red">{weather.air.co || '-'} µg/m³</span></li>
              </ul>
            </div>
          </div>
          <div className="aq-panel-der">
            <div className="aq-card aq-evolucion">
              <div className="aq-card-header">
                Evolución {RANGE_LABELS[range]}
                <select value={pollutant} onChange={(e) => setPollutant(e.target.value)}>
                  <option>PM2.5</option>
                  <option>PM10</option>
                  <option>NO₂</option>
                  <option>O₃</option>
                  <option>CO</option>
                </select>
              </div>
              {displayTrend.length ? (
                <div className="aq-grafico">
                  <AirQualityChart data={displayTrend} pollutant={pollutant} />
                </div>
              ) : (
                <div className="aq-grafico-mock">
                  <div className="aq-grafico-icon">📈</div>
                  <div className="aq-grafico-txt">Gráfico de Evolución {pollutant}<br />{RANGE_LABELS[range]}</div>
                </div>
              )}
            </div>
            <div className="aq-card aq-recomendaciones">
              <div className="aq-tag-list">
                <span className="aq-tag">PM2.5</span>
                <span className="aq-tag">PM10</span>
                <span className="aq-tag">NO₂</span>
                <span className="aq-tag">O₃</span>
              </div>
              <div className="aq-reco-row">
                <div>
                  <b>Recomendaciones de Salud</b>
                  <ul>
                    <li>Grupos sensibles: Reducir actividades al aire libre.</li>
                    <li>Usar mascarilla en exteriores si es necesario.</li>
                    <li>Mantener ventanas cerradas durante picos.</li>
                  </ul>
                </div>
                <div>
                  <b>Actividades Recomendadas</b>
                  <ul>
                    <li>Ejercicio intenso: No recomendado</li>
                    <li>Caminata ligera: Aceptable</li>
                    <li>Actividades manuales: Preferibles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

