import React, { useState } from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import './InteractiveMapDashboard.css';
import RealTimeMap from './RealTimeMap';
import { mockWeather } from '../data/mockWeather';
export default function MapPage() {
  const { weather, loading, error, search, city, setCity } = useWeather();
  const [pollutant, setPollutant] = useState('all');
  const [dateRange, setDateRange] = useState('24h');
  const [onlyActive, setOnlyActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  const handleClear = () => {
    setCity('');
    setPollutant('all');
    setDateRange('24h');
    setOnlyActive(false);
  };

  return (
    <div className="imd-dashboard-container">
      <Header />
      <main className="imd-main-content" id="main-content" tabIndex="-1">
        <aside className="imd-sidebar">
          <div className="imd-card">
            <div className="imd-card-header">Filtros</div>
            <p className="imd-filter-info">
              Personaliza los datos que se muestran en el mapa.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="imd-filter-row">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ciudad"
                  aria-label="Ciudad"
                  required
                />
                <select
                  value={pollutant}
                  onChange={(e) => setPollutant(e.target.value)}
                  aria-label="Contaminante"
                >
                  <option value="all">Todos los contaminantes</option>
                  <option value="pm25">PM2.5</option>
                  <option value="pm10">PM10</option>
                  <option value="no2">NO₂</option>
                  <option value="o3">O₃</option>
                </select>
              </div>
              <div className="imd-filter-row">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  aria-label="Rango de fecha"
                >
                  <option value="24h">Últimas 24h</option>
                  <option value="7d">Última semana</option>
                  <option value="30d">Último mes</option>
                </select>
                <label className="imd-checkbox">
                  <input
                    type="checkbox"
                    checked={onlyActive}
                    onChange={(e) => setOnlyActive(e.target.checked)}
                  />
                  Solo activas
                </label>
              </div>
              <div className="imd-filter-row">
                <button className="imd-btn-aplicar" type="submit">Aplicar</button>
                <button
                  className="imd-btn-limpiar"
                  type="button"
                  onClick={handleClear}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
          <div className="imd-card">
            <div className="imd-card-header">Leyenda</div>
            <div><span className="imd-dot imd-green"></span>Buena</div>
            <div><span className="imd-dot imd-yellow"></span>Moderada</div>
            <div><span className="imd-dot imd-orange"></span>Mala</div>
            <div><span className="imd-dot imd-red"></span>Muy Mala</div>
          </div>
          <div className="imd-card imd-estaciones-cercanas">
            <div className="imd-card-header">Estaciones Cercanas</div>
            <div className="imd-estacion">
              <span>Estación Centro</span>
              <span className="imd-status imd-activo">Operativa</span>
              <span className="imd-dist">1 km</span>
            </div>
            <div className="imd-estacion">
              <span>Estación Norte</span>
              <span className="imd-status imd-alerta">Alerta</span>
              <span className="imd-dist">4 km</span>
            </div>
            <div className="imd-estacion">
              <span>Estación Sur</span>
              <span className="imd-status imd-critico">Crítico</span>
              <span className="imd-dist">8 km</span>
            </div>
          </div>
        </aside>

        <section className="imd-mapa-panel">
          <div className="imd-mapa-header">
            <div className="imd-ubicacion">
              <b>{city || 'Valencia, España'}</b> · Coordenadas: {weather.lat || mockWeather.lat}, {weather.lon || mockWeather.lon}
              <button className="imd-btn-mas">+</button>
            </div>
            <p className="imd-map-desc">
              Selecciona filtros para visualizar datos de calidad del aire de distintas estaciones.
            </p>
          </div>
          <div className="imd-mapa-box">
            <RealTimeMap
              key={`${weather.lat || mockWeather.lat},${weather.lon || mockWeather.lon}`}
              lat={weather.lat || mockWeather.lat}
              lon={weather.lon || mockWeather.lon}
              width="90%"
              height="280px"
            />
          </div>
          <div className="imd-mapa-footer">
            <div className="imd-footer-info">
              <b>Estación Centro Valencia</b>
              <span className="imd-footer-update">Ultima actualización: {new Date().toLocaleTimeString('es-ES')} - Estado: Operativa</span>
            </div>
            <div className="imd-footer-data">
              <span>{weather.temperature || '22°C'}</span>
              <span className="imd-footer-sep">|</span>
              <span>{weather.air.uaqi || '78'} AQI</span>
              <span className="imd-footer-sep">|</span>
              <span>{weather.humidity || '65%'} Humedad</span>
            </div>
            <button className="imd-btn-detalles" type="button">Ver Detalles</button>
          </div>
        </section>
      </main>
    </div>
  );
}
