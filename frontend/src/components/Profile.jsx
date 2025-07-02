import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../Profile.css';
import { useAuth } from '../AuthContext';

export default function Profile() {
  const { user, supabase } = useAuth();
  const [dark, setDark] = useState(() => localStorage.getItem('pref_dark') === '1');

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

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="profile-container" aria-labelledby="profile-title">
        <h2 id="profile-title">Perfil de Usuario</h2>
        <p className="profile-email">{user.email}</p>
        <div className="pref-row">
          <label>
            <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
            Modo oscuro
          </label>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        {isAdmin && (
          <p className="admin-link"><a href="/admin">Ir al panel de administración</a></p>
        )}
      </main>
    </div>
  );
}
