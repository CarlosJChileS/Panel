import React from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import './InteractiveMapDashboard.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { mockWeather } from '../data/mockWeather';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});
export default function MapPage() {
  const { weather, loading, error, search, city, setCity } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  return (
    <div className="imd-dashboard-container">
      <Header />
      <main className="imd-main-content" id="main-content" tabIndex="-1">
        <aside className="imd-sidebar">
          <div className="imd-card">
            <div className="imd-card-header">Filtros</div>
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
                <select>
                  <option>Todos los contaminantes</option>
                </select>
              </div>
              <button className="imd-btn-aplicar" type="submit">Aplicar</button>
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
          </div>
          <div className="imd-mapa-box">
            <MapContainer
              key={`${weather.lat || mockWeather.lat},${weather.lon || mockWeather.lon}`}
              center={[weather.lat || mockWeather.lat, weather.lon || mockWeather.lon]}
              zoom={10}
              style={{ height: '280px', width: '90%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[weather.lat || mockWeather.lat, weather.lon || mockWeather.lon]} />
            </MapContainer>
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
