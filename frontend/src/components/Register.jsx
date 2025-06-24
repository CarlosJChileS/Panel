import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSupabaseStatus } from '../hooks/useSupabaseStatus';
import styles from './Register.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const status = useSupabaseStatus();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { data, error } = await supabase.auth.signUp({ email, password: pass });
    if (!error && data.user) {
      await supabase.from('users').insert({ id: data.user.id, email, first_name: first, last_name: last });
      setMessage('Registro exitoso');
      navigate('/dashboard');
    } else {
      setMessage('Error al registrarse');
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logoCircle}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v2M12 19v2M5.64 7.64l-1.41-1.41M18.36 16.36l1.41 1.41M3 12H5M19 12h2M5.64 16.36l-1.41 1.41M18.36 7.64l1.41-1.41" stroke="#2196f3" strokeWidth="2"/>
            <circle cx="12" cy="12" r="7" stroke="#2196f3" strokeWidth="2"/>
          </svg>
        </div>
        <h2 className={styles.title}>Únete al Panel</h2>
        <p className={styles.desc}>Forma parte de nuestra comunidad</p>
        <ul className={styles.benefits}>
          <li><span>✔</span> Accede a estadísticas</li>
          <li><span>✔</span> Gestiona tus sensores</li>
          <li><span>✔</span> Recibe alertas personalizadas</li>
          <li><span>✔</span> Contribuye con datos ambientales</li>
        </ul>
      </div>
      <div className={styles.rightPanel}>
        <h2 className={styles.registerTitle}>Crear Cuenta</h2>
        <p className={styles.registerDesc}>Completa tus datos para comenzar</p>
        <form onSubmit={handleSubmit} className={styles.form} aria-label="Crear cuenta">
          <div className={styles.doubleInput}>
            <div>
              <label className={styles.label}>Nombre *</label>
              <input className={styles.input} value={first} onChange={e => setFirst(e.target.value)} placeholder="Nombre" />
            </div>
            <div>
              <label className={styles.label}>Apellidos *</label>
              <input className={styles.input} value={last} onChange={e => setLast(e.target.value)} placeholder="Apellidos" />
            </div>
          </div>
          <label className={styles.label}>Correo *</label>
          <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" required />
          <div className={styles.doubleInput}>
            <div>
              <label className={styles.label}>Teléfono *</label>
              <div className={styles.inputIcon}>
                <span className={styles.icon}>
                  <svg width="17" height="17" fill="none"><rect x="2" y="2" width="13" height="13" rx="3" stroke="#888" strokeWidth="1.3"/><circle cx="8.5" cy="12" r="1.2" fill="#888"/></svg>
                </span>
                <input className={styles.input} placeholder="+57 300 123 4567" />
              </div>
            </div>
            <div>
              <label className={styles.label}>Facultad *</label>
              <select className={styles.input}>
                <option>Ingeniería</option>
                <option>Medicina</option>
                <option>Ciencias</option>
              </select>
            </div>
          </div>
          <label className={styles.label}>Programa Académico *</label>
          <select className={styles.input}>
            <option>Ingeniería Ambiental</option>
            <option>Ingeniería Civil</option>
            <option>Biología</option>
          </select>
          <label className={styles.label}>Contraseña *</label>
          <div className={styles.inputIcon}>
            <span className={styles.icon}>
              <svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="1.5"/><circle cx="9" cy="9" r="2" fill="#888"/></svg>
            </span>
            <input
              className={styles.input}
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="********"
              minLength={8}
              required
            />
            <span
              className={styles.iconEye}
              onClick={() => setShowPass(s => !s)}
              style={{ cursor: 'pointer' }}
              title="Mostrar/Ocultar"
            >
              {showPass ? (
                <svg width="18" height="18" fill="none"><path d="M1 9c2-4 7-7 8-7s6 3 8 7c-2 4-7 7-8 7s-6-3-8-7z" stroke="#888" strokeWidth="1.5"/><circle cx="9" cy="9" r="2" fill="#888"/></svg>
              ) : (
                <svg width="18" height="18" fill="none"><path d="M1 9c2-4 7-7 8-7s6 3 8 7c-2 4-7 7-8 7s-6-3-8-7z" stroke="#888" strokeWidth="1.5"/><path d="M3 3l12 12" stroke="#888" strokeWidth="1.5"/></svg>
              )}
            </span>
          </div>
          <small className={styles.note}>Mínimo 8 caracteres, incluye mayúsculas, minúsculas y números</small>
          <button type="submit" className={styles.registerBtn}>Crear Cuenta</button>
        </form>
        {loading && <div className="loader" role="status" aria-label="Cargando"></div>}
        {message && <div className="status-message">{message}</div>}
        {status === 'error' && (
          <div className="status-message" style={{ color: 'red' }}>
            Error de conexión con Supabase
          </div>
        )}
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          ¿Ya tienes cuenta? <Link to="/login">Ingresa</Link>
        </p>
      </div>
    </div>
  );
}
