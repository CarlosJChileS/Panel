import React, { useState, useMemo } from 'react';
import './StatisticsModule.css';
import { FaDownload } from 'react-icons/fa';
import { LineChart, BarChart, AreaChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWeather } from '../hooks/useWeather';
import { mockTrend } from '../data/mockWeather';

const PARAMS = {
  temp: 'Temperatura',
  humidity: 'Humedad',
  wind: 'Viento',
};

export default function StatisticsModule() {
  const { trend, search, city } = useWeather();
  const [location, setLocation] = useState(city || '');
  const [parameter, setParameter] = useState('temp');
  const [chartType, setChartType] = useState('line');

  const data = trend.length ? trend : mockTrend;

  const stats = useMemo(() => {
    const values = data.map((d) => Number(d[parameter])).filter((n) => !isNaN(n));
    if (!values.length) {
      return { avg: 0, max: 0, min: 0, dev: 0, diff: 0 };
    }
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const dev = Math.sqrt(values.reduce((s, v) => s + Math.pow(v - avg, 2), 0) / values.length);
    const diff = values[values.length - 1] - values[0];
    return { avg, max, min, dev, diff };
  }, [data, parameter]);

  const handleGenerate = () => {
    if (location) search(location);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={parameter} fill="#6f42c1" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={parameter} stroke="#6f42c1" fill="#e1d8f4" />
          </AreaChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={parameter} stroke="#6f42c1" />
          </LineChart>
        );
    }
  };

  return (
    <div className="stats-module">
      <header className="stats-header">
        <h2>Análisis de Datos Históricos</h2>

        <div className="stats-filters">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ubicación"
          />
          <select value={parameter} onChange={(e) => setParameter(e.target.value)}>
            <option value="temp">Temperatura</option>
            <option value="humidity">Humedad</option>
            <option value="wind">Viento</option>
          </select>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="line">Líneas</option>
            <option value="bar">Barras</option>
            <option value="area">Área</option>
          </select>
          <button className="btn-generate" onClick={handleGenerate}>
            Generar
          </button>
          <button className="btn-export">
            <FaDownload /> Exportar Reporte
          </button>
        </div>
      </header>

      <div className="stats-content">
        <aside className="stats-sidebar">
          <div className="stat-card">
            <span className="stat-label">Promedio</span>
            <span className="stat-value">{stats.avg.toFixed(1)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Máximo</span>
            <span className="stat-value">{stats.max.toFixed(1)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Mínimo</span>
            <span className="stat-value">{stats.min.toFixed(1)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Desviación</span>
            <span className="stat-value">±{stats.dev.toFixed(1)}</span>
          </div>

          <div className="trend-analysis">
            <h4>Análisis de Tendencias</h4>
            <div className="trend-item">
              <span>Tendencia</span>
              <span className={`trend-value ${stats.diff >= 0 ? 'up' : 'down'}`}>{stats.diff >= 0 ? '+' : ''}{stats.diff.toFixed(1)}</span>
            </div>
          </div>
        </aside>

        <main className="stats-chart">
          <div className="chart-header">
            <span>{PARAMS[parameter]}</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
