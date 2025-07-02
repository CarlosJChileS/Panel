import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing.css';
import { useAuth } from '../AuthContext';

export default function Header() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.is_admin;
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
          <Link to="/profile" aria-label="Perfil">
            <div className="profile-circle" title={user.email}></div>
          </Link>
        ) : (
          <Link to="/login" aria-label="Iniciar sesión">
            <div className="profile-circle"></div>
          </Link>
        )}
        {isAdmin && (
          <Link to="/admin" style={{ marginLeft: 8 }}>Admin</Link>
        )}
      </nav>
    </header>
  );
}
