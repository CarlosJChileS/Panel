import React from "react";
import { Link } from "react-router-dom";
import "../Landing.css";
import Header from "./Header";
import { useTranslation } from 'react-i18next';

export default function Welcome() {
  const { t } = useTranslation();
  return (
    <div className="dashboard-bg">
      <Header />

      <div className="central-panel">
        <h1 className="welcome-title">{t('welcome.title')}</h1>
        <p className="welcome-desc">
          {t('welcome.desc')}
        </p>
        <div className="stats">
          <div>
            <span className="stats-value">24</span>
            <br />
            <span className="stats-label">{t('welcome.activeStations')}</span>
          </div>
          <div>
            <span className="stats-value">15+</span>
            <br />
            <span className="stats-label">{t('welcome.parameters')}</span>
          </div>
          <div>
            <span className="stats-value">30min</span>
            <br />
            <span className="stats-label">{t('welcome.frequency')}</span>
          </div>
        </div>
        <div className="central-actions">
          <Link to="/login">
            <button className="main-btn">{t('welcome.btnData')}</button>
          </Link>
          <Link to="/login">
            <button className="sec-btn">{t('welcome.btnMap')}</button>
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>{t('welcome.what')}</h2>
        <p className="features-desc">
          {t('welcome.featuresDesc')}
        </p>
        <div className="features-list">
          <div className="feature-card">
            <div className="feature-title">{t('welcome.featureClimate')}</div>
            <div className="feature-sub">{t('welcome.featureClimateSub')}</div>
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
            <div className="feature-title air">{t('welcome.featureAir')}</div>
            <div className="feature-sub air">{t('welcome.featureAirSub')}</div>
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
            <div className="feature-title map">{t('welcome.featureMap')}</div>
            <div className="feature-sub map">{t('welcome.featureMapSub')}</div>
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
            <div className="feature-title alert">{t('welcome.featureAlert')}</div>
            <div className="feature-sub alert">{t('welcome.featureAlertSub')}</div>
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
