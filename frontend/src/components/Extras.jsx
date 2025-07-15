import React, { useState, useMemo } from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import ExtrasChart from './ExtrasChart';
import { mockTrend } from '../data/mockWeather';
import './AirQualityDashboard.css';

function parseNum(value) {
  const n = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isNaN(n) ? null : n;
}

function getColor(key, value) {
  const v = parseNum(value);
  if (v === null) return '';
  switch (key) {
    case 'feelsLike':
    case 'tempMin':
    case 'tempMax':
      return v > 30 ? 'red' : v > 20 ? 'yellow' : 'green';
    case 'clouds':
      return v > 80 ? 'red' : v > 50 ? 'yellow' : 'green';
    case 'visibility':
      return v < 5000 ? 'red' : v < 10000 ? 'yellow' : 'green';
    case 'pressure':
      return v < 1000 ? 'red' : v < 1010 ? 'yellow' : 'green';
    case 'humidity':
      return v > 80 ? 'red' : v > 60 ? 'yellow' : 'green';
    case 'wind':
      return v > 10 ? 'red' : v > 5 ? 'yellow' : 'green';
    default:
      return '';
  }
}

export default function Extras() {
  const { weather, trend, loading, error, search, city, setCity } = useWeather();
  const [metric, setMetric] = useState('Todos');
  const [range, setRange] = useState('24h');

  const RANGE_LABELS = {
    '24h': 'Últimas 24h',
    '7d': 'Última semana',
    '1m': 'Último mes',
    '1y': 'Último año',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  const handleExport = () => {
    const rows = data.map((d) => `${d.time},${d.temp},${d.humidity},${d.wind}`);
    const csv = ['time,temp,humidity,wind', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'extras.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setCity('');
    setMetric('Todos');
    setRange('24h');
  };

  const baseData = trend.length ? trend : mockTrend;
  const data = useMemo(() => expandTrend(baseData, range), [baseData, range]);

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
          <select value={metric} onChange={(e) => setMetric(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Temperatura">Temperatura</option>
            <option value="Humedad">Humedad</option>
            <option value="Viento">Viento</option>
          </select>
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="24h">Últimas 24h</option>
            <option value="7d">Última semana</option>
            <option value="1m">Último mes</option>
            <option value="1y">Último año</option>
          </select>
          <button type="submit" className="aq-btn-aplicar">Aplicar</button>
          <button type="button" className="aq-btn-limpiar" onClick={handleClear}>Limpiar</button>
          <button type="button" className="aq-btn-exportar" onClick={handleExport}>Exportar</button>
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
                  <span className={`aq-value ${getColor('feelsLike', weather.extras.feelsLike)}`}>{weather.extras.feelsLike}</span>
                </li>
                <li>
                  <span>Estado del cielo</span>
                  <span className="aq-value">{weather.extras.sky}</span>
                </li>
                <li>
                  <span>Nubosidad</span>
                  <span className={`aq-value ${getColor('clouds', weather.extras.clouds)}`}>{weather.extras.clouds}</span>
                </li>
                <li>
                  <span>Visibilidad</span>
                  <span className={`aq-value ${getColor('visibility', weather.extras.visibility)}`}>{weather.extras.visibility}</span>
                </li>
                <li>
                  <span>Temp. mínima</span>
                  <span className={`aq-value ${getColor('tempMin', weather.extras.tempMin)}`}>{weather.extras.tempMin}</span>
                </li>
                <li>
                  <span>Temp. máxima</span>
                  <span className={`aq-value ${getColor('tempMax', weather.extras.tempMax)}`}>{weather.extras.tempMax}</span>
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
                  <span className={`aq-value ${getColor('pressure', weather.pressure)}`}>{weather.pressure}</span>
                </li>
                <li>
                  <span>Humedad</span>
                  <span className={`aq-value ${getColor('humidity', weather.humidity)}`}>{weather.humidity}</span>
                </li>
                <li>
                  <span>Viento</span>
                  <span className={`aq-value ${getColor('wind', weather.wind)}`}>{weather.wind}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="aq-panel-der">
            <div className="aq-card aq-evolucion">
              <div className="aq-card-header">
                Pronóstico {RANGE_LABELS[range]}
                <select value={metric} onChange={(e) => setMetric(e.target.value)}>
                  <option value="Todos">Todos</option>
                  <option value="Temperatura">Temperatura</option>
                  <option value="Humedad">Humedad</option>
                  <option value="Viento">Viento</option>
                </select>
              </div>
              {data.length ? (
                <div className="aq-grafico">
                  <ExtrasChart data={data} metric={metric} />
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
