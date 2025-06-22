import React, { useState } from "react";
import "../../Dashboard.css";
import { useWeather } from "../../application/hooks/useWeather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function getStatus(type, val) {
  const n = parseFloat(val);
  if (Number.isNaN(n)) {
    if (type === 'alert') {
      if (val === 'ALTA') return 'status-bad';
      if (val === 'MEDIA') return 'status-warning';
      if (val === 'BAJA') return 'status-good';
    }
    return "";
  }
  switch (type) {
    case "temp":
      return n > 30 || n < 15 ? "status-bad" : n > 25 || n < 20 ? "status-warning" : "status-good";
    case "humidity":
      return n > 90 || n < 30 ? "status-bad" : n > 70 || n < 50 ? "status-warning" : "status-good";
    case "wind":
      return n > 10 ? "status-bad" : n > 5 ? "status-warning" : "status-good";
    case "pressure":
      return n > 1025 || n < 1000 ? "status-bad" : n > 1015 || n < 1010 ? "status-warning" : "status-good";
    case "co":
      return n > 100 ? "status-bad" : n > 50 ? "status-warning" : "status-good";
    case "no2":
      return n > 100 ? "status-bad" : n > 40 ? "status-warning" : "status-good";
    case "ozone":
      return n > 120 ? "status-bad" : n > 60 ? "status-warning" : "status-good";
    case "pm25":
      return n > 35 ? "status-bad" : n > 12 ? "status-warning" : "status-good";
    case "waterTemp":
      return n > 30 || n < 15 ? "status-bad" : n > 25 || n < 20 ? "status-warning" : "status-good";
    case "oxygen":
      return n < 4 ? "status-bad" : n < 7 ? "status-warning" : "status-good";
    case "salinity":
      return n > 38 || n < 30 ? "status-bad" : n > 36 || n < 32 ? "status-warning" : "status-good";
    case "chlorophyll":
      return n > 40 ? "status-bad" : n > 10 ? "status-warning" : "status-good";
    default:
      return "";
  }
}

function Dashboard() {
  const [city, setCity] = useState("");
  const { weather: weatherData, trend, loading, error, search } = useWeather();

  return (
    <div className="dashboard-container dashboard-bg">
      {/* Navbar superior */}
      <nav className="navbar" aria-label="Menú principal">
        <div className="navbar-title" tabIndex="0">
          Dashboard Ambiental Costero
        </div>
        <div className="navbar-links" role="menubar">
          <a href="#" role="menuitem" tabIndex="0">Dashboard</a>
          <a href="#" role="menuitem" tabIndex="0">Calidad Aire</a>
          <a href="#" role="menuitem" tabIndex="0">Calidad Agua</a>
          <a href="#" role="menuitem" tabIndex="0">Mapa</a>
          <a href="#" role="menuitem" tabIndex="0">Alertas</a>
          <a href="#" role="menuitem" tabIndex="0">Estadísticas</a>
          <a href="#" role="menuitem" tabIndex="0">Contacto</a>
        </div>
      </nav>

      {/* Consulta rápida centrada y horizontal */}
      <main id="main-content" tabIndex="-1">
        <section
          className="search-section-center"
          aria-labelledby="search-location-title"
        >
          <div className="search-box" role="region" aria-label="Consulta rápida de ubicación">
            <h2 id="search-location-title" className="search-box-title">
              Consulta Rápida de Ubicación
            </h2>
            <p id="search-location-desc">
              Ingresa tu ciudad para obtener datos ambientales
            </p>
            <form
              className="city-form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                search(city);
              }}
              aria-describedby="search-location-desc"
              role="search"
              autoComplete="off"
            >
              <label htmlFor="city-input">Ciudad</label>
              <input
                type="text"
                id="city-input"
                name="city"
                placeholder="Ej: Manta"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Ciudad"
                tabIndex="0"
                required
              />
              <button type="submit" tabIndex="0">Consultar</button>
            </form>
            {loading && <p>Consultando datos...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
          </div>
        </section>

        {/* Estado ambiental actual */}
        <section className="main-section" aria-labelledby="environment-state-title">
          <h2 id="environment-state-title" className="main-title">
            Estado Ambiental Actual
          </h2>
          <div className="main-cards-row">
            {/* Clima */}
            <article className="card" role="region" aria-label="Condiciones Climáticas">
              <h3 className="card-title">Condiciones Climáticas</h3>
              <div className="card-row">
                <span>Temperatura</span>
                <span className={getStatus('temp', weatherData.temperature)}>{weatherData.temperature}</span>
              </div>
              <div className="card-row">
                <span>Humedad</span>
                <span className={getStatus('humidity', weatherData.humidity)}>{weatherData.humidity}</span>
              </div>
              <div className="card-row">
                <span>Viento</span>
                <span className={getStatus('wind', weatherData.wind)}>{weatherData.wind}</span>
              </div>
              <div className="card-row">
                <span>Presión Atmosférica</span>
                <span className={getStatus('pressure', weatherData.pressure)}>{weatherData.pressure}</span>
              </div>
            </article>

            {/* Aire */}
            <article className="card" role="region" aria-label="Calidad del aire">
              <h3 className="card-title">Calidad Del Aire</h3>
              <div className="card-row">
                <span>Monóxido De Carbono</span>
                <span className={getStatus('co', weatherData.air.co)}>{weatherData.air.co}</span>
              </div>
              <div className="card-row">
                <span>Dióxido De Nitrógeno</span>
                <span className={getStatus('no2', weatherData.air.no2)}>{weatherData.air.no2}</span>
              </div>
              <div className="card-row">
                <span>Ozono</span>
                <span className={getStatus('ozone', weatherData.air.ozone)}>{weatherData.air.ozone}</span>
              </div>
              <div className="card-row">
                <span>Partículas PM2.5</span>
                <span className={getStatus('pm25', weatherData.air.pm25)}>{weatherData.air.pm25}</span>
              </div>
            </article>

            {/* Agua */}
            <article className="card" role="region" aria-label="Calidad del agua">
              <h3 className="card-title">Calidad Del Agua</h3>
              <div className="card-row">
                <span>Temperatura Del Mar</span>
                <span className={getStatus('waterTemp', weatherData.water.temp)}>{weatherData.water.temp}</span>
              </div>
              <div className="card-row">
                <span>Oxígeno disuelto</span>
                <span className={getStatus('oxygen', weatherData.water.oxygen)}>{weatherData.water.oxygen}</span>
              </div>
              <div className="card-row">
                <span>Salinidad</span>
                <span className={getStatus('salinity', weatherData.water.salinity)}>{weatherData.water.salinity}</span>
              </div>
              <div className="card-row">
                <span>Clorofila</span>
                <span className={getStatus('chlorophyll', weatherData.water.chlorophyll)}>{weatherData.water.chlorophyll}</span>
              </div>
            </article>

            {/* Alertas */}
            <article className="card" role="region" aria-label="Alertas">
              <h3 className="card-title">Alertas</h3>
              <div className="card-row">
                <span>Temperatura Óptima</span>
                <span className={getStatus('alert', weatherData.alerts.temp)}>{weatherData.alerts.temp}</span>
              </div>
              <div className="card-row">
                <span>Viento Fuerte</span>
                <span className={getStatus('alert', weatherData.alerts.wind)}>{weatherData.alerts.wind}</span>
              </div>
              <div className="card-row">
                <span>Humedad</span>
                <span className={getStatus('alert', weatherData.alerts.humidity)}>{weatherData.alerts.humidity}</span>
              </div>
              <div className="card-row">
                <span>Aire Contaminado</span>
                <span className={getStatus('alert', weatherData.alerts.air)}>{weatherData.alerts.air}</span>
              </div>
            </article>
          </div>

          {/* Mapa y tendencias */}
          <section className="section-box" aria-label="Mapa de ubicación">
            <strong>Mapa de Ubicación</strong>
            <div className="map-box" tabIndex="0" aria-label="Mapa interactivo">
              {weatherData.lat && weatherData.lon ? (
                <MapContainer center={[weatherData.lat, weatherData.lon]} zoom={10} style={{height: "160px", width: "100%"}}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[weatherData.lat, weatherData.lon]} />
                </MapContainer>
              ) : (
                'Mapa no disponible'
              )}
            </div>
          </section>
          <section className="section-box" aria-label="Tendencia Histórica">
            <strong>Tendencia Histórica</strong>
            <div className="map-box" tabIndex="0" aria-label="Gráfico de tendencias">
              {trend.length ? (
                <LineChart width={420} height={200} data={trend}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                </LineChart>
              ) : (
                'Gráfico no disponible'
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
