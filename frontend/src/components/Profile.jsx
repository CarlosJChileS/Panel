import React, { useState, useEffect } from 'react';
import Header from './Header';
import EditProfileModal from './EditProfileModal';
import '../Profile.css';
import './UserHistoryDashboard.css';
import { useAuth } from '../AuthContext';
import { useWeather } from '../hooks/useWeather';

export default function Profile() {
  const { user, supabase } = useAuth();
  const [dark, setDark] = useState(() => localStorage.getItem('pref_dark') === '1');
  const { history } = useWeather();
  const [showEdit, setShowEdit] = useState(false);
  const [filter, setFilter] = useState('');
  const activityHistory = [
    { action: 'Inicio de sesión', date: 'Hoy 10:00' },
    { action: 'Búsqueda: Manta', date: 'Hoy 10:05' },
  ];

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    localStorage.setItem('pref_dark', dark ? '1' : '0');
  }, [dark]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="dashboard-bg">
        <Header />
        <main className="search-section-center" aria-labelledby="profile-title" style={{paddingTop: '20px'}}>
          <div className="search-box">
            <h2 id="profile-title" className="search-box-title">Inicia sesión para ver tu perfil</h2>
          </div>
        </main>
      </div>
    );
  }

  const isAdmin = user.user_metadata?.is_admin;
  const userName = user.user_metadata?.full_name || user.email;
  const filteredHistory = history.filter((c) =>
    c.toLowerCase().includes(filter.toLowerCase())
  );
  const initials = userName
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-bg">
      <Header />
      <div className="dashboard-container" aria-labelledby="profile-title">
        <h2 id="profile-title" className="profile-title">Perfil de Usuario</h2>
        <div className="user-card">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-email">{user.email}</div>
            <div className="pref-row">
              <label>
                <input
                  type="checkbox"
                  checked={dark}
                  onChange={() => setDark(!dark)}
                />
                Modo oscuro
              </label>
            </div>
          </div>
          <div className="user-actions">
            <button className="btn export" onClick={handleLogout}>Cerrar sesión</button>
            <button className="btn export" onClick={() => setShowEdit(true)}>Editar perfil</button>
            {isAdmin && (
              <a className="btn export" href="/admin">Panel Admin</a>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <span>
                Historial de Búsquedas{' '}
                <span className="results-count">({filteredHistory.length})</span>
              </span>
              <input
                className="filter-input"
                placeholder="Filtrar"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filtrar historial"
              />
            </div>
            {filteredHistory.map((c, idx) => (
              <div className="history-card" key={idx}>
                <div className="history-card-left">
                  <div className="alert-circle">
                    <span className="icon-alert" />
                  </div>
                </div>
                <div className="history-card-body">
                  <div className="history-title-row">
                    <span className="history-title">{c}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="history-empty-card"></div>
          </div>
        )}

        {activityHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">Historial de Actividad</div>
            {activityHistory.map((a, idx) => (
              <div className="history-card" key={idx}>
                <div className="history-card-left">
                  <div className="alert-circle">
                    <span className="icon-alert" />
                  </div>
                </div>
                <div className="history-card-body">
                  <div className="history-title-row">
                    <span className="history-title">{a.action}</span>
                  </div>
                  <div className="card-date">{a.date}</div>
                </div>
              </div>
            ))}
            <div className="history-empty-card"></div>
          </div>
        )}

        {showEdit && <EditProfileModal user={user} onClose={() => setShowEdit(false)} />}
      </div>
    </div>
  );
}
