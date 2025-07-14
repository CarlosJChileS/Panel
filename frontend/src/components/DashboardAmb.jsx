import React from "react";
import styles from "./DashboardAmb.module.css";
import { useWeather } from "../hooks/useWeather";

export default function DashboardAmb() {
  const { weather, loading, error, search, city, setCity } = useWeather();
  const aqi = weather.air.uaqi || weather.air.aqi;
  const aqiCategory = weather.air.uaqiCategory || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  return (
    <div className={styles.dashboard}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <img src="/logo.svg" alt="Logo" className={styles.logo} />
          <span className={styles.logoTitle}>Dashboard Amb</span>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.active}>Dashboard</a>
          <a href="#">Calidad Aire</a>
          <a href="#">Calidad Agua</a>
          <a href="#">Mapa</a>
          <a href="#">Alertas</a>
          <a href="#">Estadísticas</a>
        </nav>
        <div className={styles.options}>
          <select className={styles.langSelect} defaultValue="ES">
            <option>ES</option>
            <option>EN</option>
          </select>
          <img src="/user.svg" alt="User" className={styles.userIcon} />
        </div>
      </header>

      {/* ESTADO AMBIENTAL */}
      <section className={styles.stateSection}>
        <div className={styles.stateHeader}>
          <h2>Estado Ambiental en Tiempo Real</h2>
          <div className={styles.moderateAlert}>
            <span>{weather.alerts.uaqi || weather.alerts.air || ""}</span>
            <small>Precaución recomendada</small>
          </div>
        </div>
        <div className={styles.stateGrid}>
          <div className={`${styles.stateCard} ${styles.temp}`}>
            <div>🌡️ Temperatura</div>
            <div className={styles.value}>{weather.temperature || "-"}</div>
            <small>Sensación térmica: {weather.extras.feelsLike || "-"}</small>
          </div>
          <div className={`${styles.stateCard} ${styles.air}`}>
            <div>🌬️ Calidad Aire</div>
            <div className={styles.value}>{aqi || "-"}</div>
            <small>Índice AQI - {aqiCategory || "-"}</small>
          </div>
          <div className={`${styles.stateCard} ${styles.water}`}>
            <div>💧 Calidad Agua</div>
            <div className={styles.value}>{weather.extras.tempMax || "-"}</div>
            <small>Temperatura marina</small>
          </div>
          <div className={`${styles.stateCard} ${styles.wind}`}>
            <div>💨 Viento</div>
            <div className={styles.value}>{weather.wind || "-"}</div>
            <small>Dirección: -</small>
          </div>
        </div>
      </section>

      {/* CONSULTA PERSONALIZADA */}
      <section className={styles.querySection}>
        <h3>
          <span className={styles.queryIcon}>🔍</span>
          Consulta Personalizada de Datos
        </h3>
        <form className={styles.queryForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ubicación o Coordenadas"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select>
            <option>Datos Completos</option>
            <option>Calidad Aire</option>
            <option>Calidad Agua</option>
          </select>
          <button type="submit">Consultar Ahora</button>
        </form>
        {loading && <p>Consultando datos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>

      {/* CONDICIONES CLIMÁTICAS */}
      <section className={styles.weatherSection}>
        <div className={styles.weatherHeader}>
          <h4>Condiciones Climáticas</h4>
        </div>
        <div className={styles.weatherGrid}>
          <div>
            <div>Humedad Relativa</div>
            <div className={styles.weatherValue}>{weather.humidity || '-'}</div>
          </div>
          <div>
            <div>Presión Atmosférica</div>
            <div className={styles.weatherValue}>{weather.pressure || '-'}</div>
          </div>
          <div>
            <div>Visibilidad</div>
            <div className={styles.weatherValue}>{weather.extras.visibility || '-'}</div>
          </div>
          <div>
            <div>Índice UV</div>
            <div className={styles.weatherValue}>{weather.extras.uvi || '-'}</div>
          </div>
        </div>
      </section>

      {/* MONITOREO DE CALIDAD DEL AIRE */}
      <section className={styles.airMonitorSection}>
        <div className={styles.airMonitorHeader}>
          <h4>Monitoreo de Calidad del Aire</h4>
        </div>
        <div className={styles.aqiBox}>
          <div className={styles.aqiValue}>{aqi || '-'}</div>
          <div className={`${styles.aqiStatus} ${styles.aqiModerate}`}>
            {aqiCategory ? aqiCategory.toUpperCase() : '-'}
          </div>
          <small>
            Grupos sensibles deben limitar actividades prolongadas al aire libre
          </small>
        </div>
        <div className={styles.aqiDetails}>
          <div className={`${styles.aqiDetail} ${styles.pm}`}>
            <div>PM2.5</div>
            <div>{weather.air.pm25 || '-' } μg/m³</div>
          </div>
          <div className={`${styles.aqiDetail} ${styles.no2}`}>
            <div>NO₂</div>
            <div>{weather.air.no2 || '-' } μg/m³</div>
          </div>
          <div className={`${styles.aqiDetail} ${styles.o3}`}>
            <div>O₃</div>
            <div>{weather.air.ozone || '-' } μg/m³</div>
          </div>
        </div>
      </section>

      {/* SISTEMA DE ALERTAS */}
      <section className={styles.alertSection}>
        <h4>Sistema de Alertas Inteligente</h4>
        {Object.entries(weather.alerts).map(([k, v]) => (
          <div
            key={k}
            className={`${styles.alertBox} ${
              v === 'ALTA'
                ? styles.alertDanger
                : v === 'MEDIA'
                ? styles.alertWarning
                : styles.alertInfo
            }`}
          >
            {k.toUpperCase()}: {v}
          </div>
        ))}
      </section>

      {/* MAPA DE ESTACIONES */}
      <section className={styles.mapSection}>
        <h4>Mapa de Estaciones en Tiempo Real</h4>
        <div className={styles.stationsGrid}>
          <div className={`${styles.station} ${styles.moderate}`}>
            {city || 'Ubicación'} <br />
            <small>AQI: {aqi || '-'} | {weather.temperature || '-'}</small>
          </div>
        </div>
      </section>

      {/* TENDENCIAS INTELIGENTES */}
      <section className={styles.trendsSection}>
        <h4>Análisis de Tendencias Inteligente</h4>
        <div className={styles.trendsGrid}>
          <div>
            <strong>Temperatura Mínima</strong>
            <p>{weather.extras.tempMin || '-'}</p>
          </div>
          <div>
            <strong>Temperatura Máxima</strong>
            <p>{weather.extras.tempMax || '-'}</p>
          </div>
          <div>
            <strong>Estado del Cielo</strong>
            <p>{weather.extras.sky || '-'}</p>
          </div>
        </div>
      </section>

      {/* RECOMENDACIONES */}
      <section className={styles.recommendSection}>
        <h4>Recomendaciones Inteligentes</h4>
        <p>
          {aqiCategory === 'Bueno'
            ? 'Condiciones óptimas para actividades al aire libre'
            : 'Precaución para grupos sensibles'}
        </p>
      </section>
    </div>
  );
}
