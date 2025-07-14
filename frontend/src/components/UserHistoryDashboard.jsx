import React from "react";
import Header from "./Header";
import "./UserHistoryDashboard.css";

const historyData = [
  {
    title: "Calidad del Aire - Valencia Centro",
    date: "Hoy, 14:30",
    parameters: [
      { name: "PM2.5", color: "#E15A5A" },
      { name: "NO₂", color: "#F9A84F" },
      { name: "O₃", color: "#FFD96A" },
      { name: "CO", color: "#7DE3B1" },
    ],
    aqi: 78,
    aqiLabel: "MODERADO",
    aqiColor: "#FFD96A",
    alerts: 2,
    alertColor: "#E15A5A",
  },
];

export default function UserHistoryDashboard() {
  const userName = "Dr. María González Rodríguez";
  const initials = userName
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-bg">
      <Header />
      <div className="dashboard-container">
        {/* User Card */}
        <div className="user-card">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-email">maria.gonzalez@universidad.es</div>
            <div className="user-stats">
              <div>
                <span className="user-stat-number">247</span>
                <span className="user-stat-label">Búsquedas totales</span>
              </div>
              <div>
                <span className="user-stat-number green">18</span>
                <span className="user-stat-label">Esta semana</span>
              </div>
              <div>
                <span className="user-stat-number">5</span>
                <span className="user-stat-label">Favoritas</span>
              </div>
            </div>
          </div>
          <div className="user-actions">
            <button className="btn green">+ Nueva Búsqueda</button>
            <button className="btn export">Exportar</button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-row">
            <input
              className="filter-input"
              placeholder="Buscar por ubicación, tipo..."
            />
            <select className="filter-select">
              <option>Todas las consultas</option>
            </select>
            <select className="filter-select">
              <option>Últimos 30 días</option>
            </select>
            <select className="filter-select">
              <option>Todos</option>
            </select>
            <button className="btn apply">Aplicar</button>
            <button className="btn clear">Limpiar</button>
          </div>
        </div>

        {/* History List */}
        <div className="history-section">
          <div className="history-header">
            <span>
              Historial de Búsquedas{" "}
              <span className="results-count">(247 resultados)</span>
            </span>
            <select className="order-select">
              <option>Más reciente</option>
            </select>
          </div>

          {/* History Card */}
          {historyData.map((item, i) => (
            <div className="history-card" key={i}>
              <div className="history-card-left">
                <div className="alert-circle">
                  <span className="icon-alert" />
                </div>
              </div>
              <div className="history-card-body">
                <div className="history-title-row">
                  <span className="history-title">{item.title}</span>
                  <span className="history-date">{item.date}</span>
                </div>
                <div className="history-description">
                  Consulta completa de contaminantes atmosféricos
                </div>
                <div className="history-params">
                  <span className="param-label">Parámetros consultados:</span>
                  {item.parameters.map((p, idx) => (
                    <span
                      key={idx}
                      className="param-badge"
                      style={{ background: p.color }}
                    >
                      {p.name}
                    </span>
                  ))}
                  <span className="param-label">Resultados obtenidos:</span>
                  <span className="aqi-badge" style={{ background: item.aqiColor }}>
                    AQI {item.aqi} {item.aqiLabel}
                  </span>
                  <span className="alerts-badge" style={{ background: item.alertColor }}>
                    {item.alerts} Alertas
                  </span>
                </div>
                <div className="history-actions">
                  <button className="icon-btn repeat" title="Repetir"></button>
                  <button className="icon-btn fav" title="Favorito"></button>
                  <button className="icon-btn download" title="Descargar"></button>
                </div>
              </div>
            </div>
          ))}

          {/* Placeholder for more results */}
          <div className="history-empty-card"></div>
        </div>
      </div>
    </div>
  );
}
