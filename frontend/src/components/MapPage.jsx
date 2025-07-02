import React, { useState } from 'react';
import Header from './Header';
import { useWeather } from '../hooks/useWeather';
import '../Dashboard.css';
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
  const [city, setCity] = useState('');
  const { weather, loading, error, search } = useWeather();

  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="map-title">
          <div className="search-box">
            <h2 id="map-title" className="search-box-title">Mapa de Ubicación</h2>
            <form
              className="city-form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                search(city);
              }}
            >
              <label htmlFor="map-city">Ciudad</label>
              <input
                id="map-city"
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
              <MapContainer
                key={`${weather.lat || mockWeather.lat},${weather.lon || mockWeather.lon}`}
                center={[weather.lat || mockWeather.lat, weather.lon || mockWeather.lon]}
                zoom={10}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[weather.lat || mockWeather.lat, weather.lon || mockWeather.lon]} />
              </MapContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
