import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Auth.css';
import logo from '../logo.svg';
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
    <div className="register-container">
      <div className="register-leftPanel">
        <div className="logoCircle">
          <img src={logo} alt="logo" width="40" />
        </div>
        <h2 className="title">Crea tu cuenta</h2>
        <p className="desc">Regístrate para acceder al panel</p>
      </div>
      <div className="register-rightPanel">
        <h2 className="registerTitle">Registrarse</h2>
        <p className="registerDesc">Introduce tus datos</p>
        <form className="form" onSubmit={handleSubmit} aria-label="Crear cuenta">
          <label className="label" htmlFor="reg-email">Correo</label>
          <div className="inputIcon">
            <input
              className="input"
              id="reg-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <label className="label" htmlFor="reg-pass">Contraseña</label>
          <div className="inputIcon">
            <input
              className="input"
              id="reg-pass"
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
            />
          </div>
          <button className="registerBtn" type="submit">Crear cuenta</button>
        </form>
        {loading && <div className="loader" role="status" aria-label="Cargando"></div>}
        {message && <div className="status-message">{message}</div>}
        {status === 'error' && (
          <div className="status-message" style={{ color: 'red' }}>
            Error de conexión con Supabase
          </div>
        )}
        <p className="registerRow">
          ¿Ya tienes cuenta?
          <Link className="registerLink" to="/login">Ingresa</Link>
        </p>
      </div>
    </div>
  );
}
