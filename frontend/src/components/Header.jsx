import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Landing.css';
import { useAuth } from '../AuthContext';

export default function Header() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.is_admin;
  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <header className="header">
        <div className="header-title">
          <span className="header-main-title">Dashboard Ambiental Costero</span>
          <span className="header-subtitle">Monitoreo en Tiempo Real</span>
        </div>
      <nav className="navbar-links" aria-label="Navegación principal">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/aire"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Calidad Aire
        </NavLink>
        <NavLink
          to="/extras"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Condiciones Extra
        </NavLink>
        <NavLink
          to="/mapa"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Mapa
        </NavLink>
        <NavLink
          to="/alertas"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Alertas
        </NavLink>
        <NavLink
          to="/estadisticas"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Estadísticas
        </NavLink>
        <NavLink
          to="/contacto"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Contacto
        </NavLink>
          {user ? (
            <NavLink
              to="/profile"
              aria-label="Perfil"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <div className="profile-circle" title={user.email}></div>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              aria-label="Iniciar sesión"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <div className="profile-circle"></div>
            </NavLink>
          )}
          {isAdmin && (
            <NavLink
              to="/admin"
              style={{ marginLeft: 8 }}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Admin
            </NavLink>
          )}
      </nav>
      </header>
    </>
  );
}
