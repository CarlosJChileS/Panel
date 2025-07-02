import React, { useState } from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import '../Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Stats() {
  const [city, setCity] = useState('');
  const { weather, trend, loading, error, search } = useWeather();

  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="stats-title">
          <div className="search-box">
            <h2 id="stats-title" className="search-box-title">Estadísticas</h2>
            <form
              className="city-form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                search(city);
              }}
            >
              <label htmlFor="stats-city">Ciudad</label>
              <input
                id="stats-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej: Manta"
                required
              />
              <button type="submit">Consultar</button>
            </form>
            {loading && <p>Consultando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="map-box" style={{ marginTop: 16 }}>
              {trend.length ? (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={trend}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                'Gráfico no disponible'
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
