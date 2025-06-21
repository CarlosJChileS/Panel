import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [city, setCity] = useState("");

  // Mock data para pruebas, reemplázalos con la API cuando quieras
  const weatherData = {
    temperature: "76°C",
    humidity: "65%",
    wind: "15 km/h",
    pressure: "1013 hPA",
    air: {
      co: "76.2",
      no2: "76.2",
      ozone: "76.2",
      pm25: "76.2",
    },
    water: {
      temp: "76°C",
      oxygen: "8.8",
      salinity: "36.5ppt",
      chlorophyll: "76.2",
    },
    alerts: {
      temp: "BAJA",
      wind: "MEDIA",
    },
  };

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
              onSubmit={(e) => e.preventDefault()}
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
                <span>{weatherData.temperature}</span>
              </div>
              <div className="card-row">
                <span>Humedad</span>
                <span>{weatherData.humidity}</span>
              </div>
              <div className="card-row">
                <span>Viento</span>
                <span>{weatherData.wind}</span>
              </div>
              <div className="card-row">
                <span>Presión Atmosférica</span>
                <span>{weatherData.pressure}</span>
              </div>
            </article>

            {/* Aire */}
            <article className="card" role="region" aria-label="Calidad del aire">
              <h3 className="card-title">Calidad Del Aire</h3>
              <div className="card-row">
                <span>Monóxido De Carbono</span>
                <span>{weatherData.air.co}</span>
              </div>
              <div className="card-row">
                <span>Dióxido De Nitrógeno</span>
                <span>{weatherData.air.no2}</span>
              </div>
              <div className="card-row">
                <span>Ozono</span>
                <span>{weatherData.air.ozone}</span>
              </div>
              <div className="card-row">
                <span>Partículas PM2.5</span>
                <span>{weatherData.air.pm25}</span>
              </div>
            </article>

            {/* Agua */}
            <article className="card" role="region" aria-label="Calidad del agua">
              <h3 className="card-title">Calidad Del Agua</h3>
              <div className="card-row">
                <span>Temperatura Del Mar</span>
                <span>{weatherData.water.temp}</span>
              </div>
              <div className="card-row">
                <span>Oxígeno disuelto</span>
                <span>{weatherData.water.oxygen}</span>
              </div>
              <div className="card-row">
                <span>Salinidad</span>
                <span>{weatherData.water.salinity}</span>
              </div>
              <div className="card-row">
                <span>Clorofila</span>
                <span>{weatherData.water.chlorophyll}</span>
              </div>
            </article>

            {/* Alertas */}
            <article className="card" role="region" aria-label="Alertas">
              <h3 className="card-title">Alertas</h3>
              <div className="card-row">
                <span>Temperatura Óptima</span>
                <span>{weatherData.alerts.temp}</span>
              </div>
              <div className="card-row">
                <span>Viento Fuerte</span>
                <span>{weatherData.alerts.wind}</span>
              </div>
              <div className="card-row"></div>
              <div className="card-row"></div>
            </article>
          </div>

          {/* Mapa y tendencias */}
          <section className="section-box" aria-label="Mapa de estaciones">
            <strong>Mapa de Estaciones</strong>
            <div className="map-box" tabIndex="0" aria-label="Mapa interactivo">
              Mapa interactivo
            </div>
          </section>
          <section className="section-box" aria-label="Tendencia Histórica">
            <strong>Tendencia Histórica</strong>
            <div className="map-box" tabIndex="0" aria-label="Gráfico de tendencias">
              Gráfico de Tendencias
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
