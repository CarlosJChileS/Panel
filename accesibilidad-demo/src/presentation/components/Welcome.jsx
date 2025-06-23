import React from "react";
import { Link } from "react-router-dom";
import "../../Landing.css";
import Header from "./Header";

export default function Welcome() {
  return (
    <div className="dashboard-bg">
      <Header />

      <div className="central-panel">
        <h1 className="welcome-title">Bienvenido al Sistema de Monitoreo Ambiental</h1>
        <p className="welcome-desc">
          Accede a información actualizada sobre la calidad del aire, agua y condiciones climáticas de tu zona costera.
        </p>
        <div className="stats">
          <div>
            <span className="stats-value">24</span>
            <br />
            <span className="stats-label">Estaciones Activas</span>
          </div>
          <div>
            <span className="stats-value">15+</span>
            <br />
            <span className="stats-label">Parámetros Monitoreados</span>
          </div>
          <div>
            <span className="stats-value">30min</span>
            <br />
            <span className="stats-label">Frecuencia Actualización</span>
          </div>
        </div>
        <div className="central-actions">
          <Link to="/login">
            <button className="main-btn">Consultar Datos Ahora</button>
          </Link>
          <Link to="/login">
            <button className="sec-btn">Explorar Mapa</button>
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>¿Qué puedes hacer con nuestro sistema?</h2>
        <p className="features-desc">
          Explora todas las funcionalidades disponibles para el monitoreo ambiental
        </p>
        <div className="features-list">
          <div className="feature-card">
            <div className="feature-title">Datos Climáticos</div>
            <div className="feature-sub">En Tiempo Real</div>
            <div className="feature-desc">
              Accede a información meteorológica actualizada cada 30 minutos incluyendo temperatura, humedad, presión atmosférica y condiciones del viento.
              <ul>
                <li>✔ Temperatura y sensación térmica</li>
                <li>✔ Humedad relativa y presión</li>
                <li>✔ Velocidad y dirección del viento</li>
              </ul>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-title air">Calidad del Aire</div>
            <div className="feature-sub air">Monitoreo Continuo</div>
            <div className="feature-desc">
              Monitorea los principales contaminantes atmosféricos con alertas automáticas cuando se superan los umbrales recomendados por la OMS.
              <ul>
                <li>✔ PM2.5, PM10 y partículas suspendidas</li>
                <li>✔ CO, NO₂, O₃ y otros gases</li>
                <li>✔ Índice AQI con recomendaciones</li>
              </ul>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-title map">Mapa Interactivo</div>
            <div className="feature-sub map">Visualización Geoespacial</div>
            <div className="feature-desc">
              Explora datos ambientales en un mapa interactivo con filtros personalizables e información detallada de cada estación de monitoreo.
              <ul>
                <li>✔ Ubicación de estaciones en tiempo real</li>
                <li>✔ Filtros por tipo de parámetro</li>
                <li>✔ Capas de visualización avanzadas</li>
              </ul>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-title alert">Sistema de Alertas</div>
            <div className="feature-sub alert">Notificaciones Inteligentes</div>
            <div className="feature-desc">
              Recibe alertas automáticas cuando los parámetros ambientales superen los umbrales establecidos, con recomendaciones personalizadas.
              <ul>
                <li>✔ Alertas configurables por usuario</li>
                <li>✔ Niveles de prioridad y urgencia</li>
                <li>✔ Recomendaciones de salud y seguridad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
