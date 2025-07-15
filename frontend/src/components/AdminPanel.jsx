import React, { useEffect, useState } from 'react';
import Header from './Header';
import Placeholder from './Placeholder';
import { useAuth } from '../AuthContext';
import '../AdminPanel.css';

export default function AdminPanel() {
  const { user, supabase } = useAuth();
  const isAdmin = user?.user_metadata?.is_admin;

  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // 'create' | 'edit' | 'delete'
  const [form, setForm] = useState({ id: null, email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdmin) {
      fetchRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  async function fetchRecords(search = '') {
    setLoading(true);
    let query = supabase
      .from('users')
      .select('id, email, created_at')
      .order('created_at', { ascending: false });
    if (search) {
      query = query.ilike('email', `%${search}%`);
    }
    const { data, error } = await query;
    if (!error) {
      setRecords(data || []);
      setError('');
    } else {
      setError('Error al cargar');
    }
    setLoading(false);
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setFilter(value);
    fetchRecords(value);
  };

  const openCreate = () => {
    setForm({ id: null, email: '' });
    setModal('create');
  };

  const openEdit = (rec) => {
    setForm({ id: rec.id, email: rec.email });
    setModal('edit');
  };

  const openDelete = (rec) => {
    setForm({ id: rec.id, email: rec.email });
    setModal('delete');
  };

  const handleClear = () => {
    setFilter('');
    fetchRecords('');
  };

  const closeModal = () => {
    setModal(null);
    setForm({ id: null, email: '' });
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    if (modal) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modal === 'create') {
      await supabase.from('users').insert({ email: form.email });
    } else if (modal === 'edit') {
      await supabase.from('users').update({ email: form.email }).eq('id', form.id);
    } else if (modal === 'delete') {
      await supabase.from('users').delete().eq('id', form.id);
    }
    closeModal();
    fetchRecords(filter);
  };

  if (!isAdmin) {
    return <Placeholder title="Acceso restringido" />;
  }

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="search-section-center" aria-labelledby="admin-title" style={{ paddingTop: '20px' }}>
        <div className="search-box" role="region" aria-label="Panel de administración">
          <h2 id="admin-title" className="search-box-title">Panel de Administración</h2>
          <div className="admin-search">
            <label htmlFor="search-email" className="visually-hidden">Buscar usuario</label>
          <input
            id="search-email"
            type="text"
            placeholder="Buscar por email"
            value={filter}
            onChange={handleSearch}
          />
          <button type="button" className="admin-clear" onClick={handleClear}>
            Limpiar
          </button>
          <button type="button" onClick={openCreate}>Nuevo</button>
        </div>
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td>{r.email}</td>
                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="admin-actions">
                      <button type="button" onClick={() => openEdit(r)} aria-label={`Editar ${r.email}`}>Editar</button>
                      <button type="button" onClick={() => openDelete(r)} aria-label={`Eliminar ${r.email}`}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan="3">Sin registros</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {modal && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            {modal === 'delete' ? (
              <form onSubmit={handleSubmit}>
                <h3 id="modal-title">Eliminar usuario</h3>
                <p>¿Desea eliminar {form.email}?</p>
                <div className="modal-actions">
                  <button type="submit">Confirmar</button>
                  <button type="button" onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 id="modal-title">{modal === 'create' ? 'Crear usuario' : 'Editar usuario'}</h3>
                <label htmlFor="modal-email">Correo electrónico</label>
                <input
                  id="modal-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  autoFocus
                />
                <div className="modal-actions">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
