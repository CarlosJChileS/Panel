import React from 'react';
import Header from './Header';
import Placeholder from './Placeholder';
import { useAuth } from '../AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.is_admin;

  if (!isAdmin) {
    return <Placeholder title="Acceso restringido" />;
  }

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="search-section-center" aria-labelledby="admin-title" style={{paddingTop: '20px'}}>
        <div className="search-box" role="region" aria-label="Panel de administración">
          <h2 id="admin-title" className="search-box-title">Panel de Administración</h2>
          <p>Gestione usuarios y configuraciones del sistema.</p>
          <ul style={{ textAlign: 'left', marginTop: 16 }}>
            <li>Revisar registros recientes</li>
            <li>Administrar cuentas de usuario</li>
            <li>Configurar parámetros del sistema</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
