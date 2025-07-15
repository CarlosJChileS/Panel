import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Landing.css';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import SearchSections from './SearchSections';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.is_admin;
  const initials = user?.email
    ? user.email.split('@')[0].slice(0, 2).toUpperCase()
    : '';
  return (
    <>
      <a href="#main-content" className="skip-link">{t('header.skip')}</a>
      <header className="header">
        <div className="header-title">
          <span className="header-main-title">{t('header.mainTitle')}</span>
          <span className="header-subtitle">{t('header.subtitle')}</span>
          <div className="lang-switch">
            <button onClick={() => i18n.changeLanguage('es')}>ES</button>
            <button onClick={() => i18n.changeLanguage('en')}>EN</button>
          </div>
        </div>
        <div className="header-actions">
          <nav className="navbar-links" aria-label="Navegación principal">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.dashboard')}
        </NavLink>
        <NavLink
          to="/aire"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.air')}
        </NavLink>
        <NavLink
          to="/extras"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.extras')}
        </NavLink>
        <NavLink
          to="/mapa"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.map')}
        </NavLink>
        <NavLink
          to="/alertas"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.alerts')}
        </NavLink>
        <NavLink
          to="/estadisticas"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.stats')}
        </NavLink>
        <NavLink
          to="/contacto"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('header.contact')}
        </NavLink>
          {user ? (
            <NavLink
              to="/profile"
              aria-label="Perfil"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <div className="profile-circle" title={user.email}>{initials}</div>
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
              {t('header.admin')}
            </NavLink>
          )}
          </nav>
          <SearchSections />
        </div>
      </header>
    </>
  );
}
