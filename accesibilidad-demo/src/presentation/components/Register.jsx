import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../Landing.css';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const { supabase } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password: pass });
    if (!error && data.user) {
      await supabase.from('users').insert({ id: data.user.id, email });
      navigate('/dashboard');
    }
  }

  return (
    <div className="dashboard-bg">
      <div className="central-panel" style={{ maxWidth: '400px' }}>
        <h1 className="welcome-title" id="register-title">Registrarse</h1>
        <form className="login-form" onSubmit={handleSubmit} aria-label="Crear cuenta">
          <label htmlFor="reg-email">Correo</label>
          <input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="reg-pass">Contraseña</label>
          <input id="reg-pass" type="password" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit">Crear cuenta</button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          ¿Ya tienes cuenta? <Link to="/login">Ingresa</Link>
        </p>
      </div>
    </div>
  );
}
