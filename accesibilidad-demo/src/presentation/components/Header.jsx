import React from 'react';
import { Link } from 'react-router-dom';
import '../../Landing.css';
import { useAuth } from '../AuthContext';

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="header">
      <div className="header-title">
        <span className="header-main-title">Dashboard Ambiental Costero</span>
        <span className="header-subtitle">Monitoreo en Tiempo Real</span>
      </div>
      <nav className="navbar-links" aria-label="Navegación principal">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/aire">Calidad Aire</Link>
        <Link to="/extras">Condiciones Extra</Link>
        <Link to="/mapa">Mapa</Link>
        <Link to="/alertas">Alertas</Link>
        <Link to="/estadisticas">Estadísticas</Link>
        <Link to="/contacto">Contacto</Link>
        {user ? (
          <span className="profile-circle" title={user.email}></span>
        ) : (
          <Link to="/login" aria-label="Iniciar sesión">
            <div className="profile-circle"></div>
          </Link>
        )}
      </nav>
    </header>
  );
}
