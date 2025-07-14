import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0);
  const strengthText = ['Muy débil', 'Débil', 'Regular', 'Buena', 'Fuerte'];
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const status = useSupabaseStatus();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(/\S+@\S+\.\S+/.test(value) ? '' : 'Correo inválido');
  };

  const calcStrength = (value) => {
    let s = 0;
    if (value.length > 5) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/[0-9]/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return s;
  };

  const handlePassChange = (e) => {
    const value = e.target.value;
    setPass(value);
    setPassError(value.length >= 6 ? '' : 'Mínimo 6 caracteres');
    setStrength(calcStrength(value));
  };

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
              onChange={handleEmailChange}
              autoFocus
              required
            />
          </div>
          {emailError && (
            <div style={{ color: 'red' }} aria-live="polite">
              {emailError}
            </div>
          )}
          <label className="label" htmlFor="reg-pass">Contraseña</label>
          <div className="inputIcon">
            <input
              className="input"
              id="reg-pass"
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={handlePassChange}
              required
            />
            <button
              type="button"
              className="iconEye"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passError && (
            <div style={{ color: 'red' }} aria-live="polite">
              {passError}
            </div>
          )}
          <div aria-live="polite" style={{ marginTop: 8 }}>
            <meter
              min="0"
              max="4"
              value={strength}
              style={{ width: '100%' }}
              aria-label="Fortaleza de la contraseña"
            />
            <div style={{ fontSize: '0.9rem', textAlign: 'center' }}>
              {strengthText[strength]}
            </div>
          </div>
          <button className="registerBtn" type="submit">Crear cuenta</button>
        </form>
        {loading && <div className="loader" role="status" aria-label="Cargando"></div>}
        {message && (
          <div className="status-message" aria-live="polite">{message}</div>
        )}
        {status === 'error' && (
          <div className="status-message" style={{ color: 'red' }} aria-live="polite">
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
