import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../Dashboard.css';
import Header from './Header';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const { supabase } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password: pass });
    if (!error) navigate('/dashboard');
  }

  return (
    <div className="dashboard-container dashboard-bg" style={{ paddingTop: '60px' }}>
      <Header />
      <main className="search-section-center" aria-labelledby="register-title">
        <div className="search-box" role="region" aria-label="Crear cuenta">
          <h2 id="register-title" className="search-box-title">Registrarse</h2>
          <form className="city-form-horizontal" onSubmit={handleSubmit} style={{ flexDirection: 'column', gap: '12px' }}>
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
      </main>
    </div>
  );
}
