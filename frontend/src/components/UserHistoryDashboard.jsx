import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import EditProfileModal from "./EditProfileModal";
import "./UserHistoryDashboard.css";

const historyData = [
  {
    title: "Calidad del Aire - Valencia Centro",
    date: "Hoy, 14:30",
    description: "Consulta completa de contaminantes atmosféricos",
    parameters: ["PM2.5", "NO₂", "O₃", "CO"],
    aqi: 78,
    alerts: 2,
  },
];

export default function UserHistoryDashboard() {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const userName =
    user?.user_metadata?.full_name || "Dr. María González Rodríguez";
  const email = user?.email || "maria.gonzalez@universidad.es";
  const initials = userName
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-bg">
      {/* Header */}
      <div className="dashboard-header">
        <span className="breadcrumb">
          Inicio &gt; Mi Perfil &gt; Historial de Búsquedas
        </span>
        <div className="dashboard-navbar">
          <span className="dashboard-title">Dashboard Ambiental</span>
          <div className="nav-items">
            <button className="nav-btn">Perfil</button>
            <button className="nav-btn active">Historial</button>
            <button className="nav-btn">Configuración</button>
            <select className="lang-select" aria-label="Idioma">
              <option>ES</option>
              <option>EN</option>
            </select>
            <div className="user-avatar" title={userName}>
              {initials}
            </div>
          </div>
        </div>
      </div>

      {/* User Card */}
      <div className="user-card">
        <div className="user-img" aria-hidden="true">
          <span role="img" aria-label="user">
            👤
          </span>
        </div>
        <div className="user-info">
          <div>
            <span className="user-name">{userName}</span>
            <div className="user-email">{email}</div>
          </div>
          <div className="user-stats">
            <div>
              <span className="stat-main blue">247</span>
              <div className="stat-label">Búsquedas totales</div>
            </div>
            <div>
              <span className="stat-main green">18</span>
              <div className="stat-label">Esta semana</div>
            </div>
            <div>
              <span className="stat-main red">5</span>
              <div className="stat-label">Favoritas</div>
            </div>
          </div>
        </div>
        <div className="user-actions">
          <button className="btn-green">+ Nueva Búsqueda</button>
          <button className="btn-outline">Exportar</button>
          <button className="btn-outline" onClick={() => setShowEdit(true)}>
            Editar perfil
          </button>
        </div>
      </div>

      {/* Filtro de historial */}
      <div className="search-filter">
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
          <button className="btn-blue">Aplicar</button>
          <button className="btn-light">Limpiar</button>
        </div>
      </div>

      {/* Historial */}
      <div className="history-list">
        <div className="history-title">
          Historial de Búsquedas
          <span className="history-count">(247 resultados)</span>
          <select className="order-select">
            <option>Más reciente</option>
            <option>Más antiguo</option>
          </select>
        </div>

        {historyData.map((h, idx) => (
          <div className="history-card" key={idx}>
            <div className="card-left">
              <div className="card-icon" aria-hidden="true">
                <span role="img" aria-label="filter">
                  🔧
                </span>
              </div>
            </div>
            <div className="card-main">
              <div className="card-title">
                {h.title}
                <span className="dot" />
              </div>
              <div className="card-date">{h.date}</div>
              <div className="card-desc">{h.description}</div>
              <div className="card-params">
                {h.parameters.map((p) => (
                  <span key={p} className="param">
                    {p}
                  </span>
                ))}
              </div>
              <div className="card-results">
                <span className="aqi-label">AQI</span>
                <span className="aqi-value">{h.aqi}</span>
                <span className="aqi-status moderate">MODERADO</span>
                <span className="alerts">
                  <span className="alerts-value">{h.alerts}</span> Alertas
                </span>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn-repeat">Repetir</button>
              <button className="btn-fav">&#10084;</button>
              <button className="btn-outline" aria-label="Descargar">
                <span role="img" aria-label="download">
                  &#8681;
                </span>
              </button>
              <button className="btn-outline" aria-label="Opciones">
                <span role="img" aria-label="more">
                  ⋮
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEdit && (
        <EditProfileModal user={user} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}
