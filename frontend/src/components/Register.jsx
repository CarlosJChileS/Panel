import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Landing.css';
import { useAuth } from '../AuthContext';
import { useSupabaseStatus } from '../hooks/useSupabaseStatus';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
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
      await supabase.from('users').insert({ id: data.user.id, email });
      setMessage('Registro exitoso');
      navigate('/dashboard');
    } else {
      setMessage('Error al registrarse');
    }
    setLoading(false);
  }

  return (
    <div className="dashboard-bg auth-container">

      <div className="central-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="welcome-title" id="register-title">Registrarse</h1>
        <form className="login-form" onSubmit={handleSubmit} aria-label="Crear cuenta">
          <label htmlFor="reg-email">Correo</label>
          <input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="reg-pass">Contraseña</label>
          <input id="reg-pass" type="password" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit">Crear cuenta</button>
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
