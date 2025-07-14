import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "../Auth.css";
import logo from "../logo.svg";
import { useAuth } from "../AuthContext";
import { useSupabaseStatus } from "../hooks/useSupabaseStatus";
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const status = useSupabaseStatus();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUser(value);
    setEmailError(/\S+@\S+\.\S+/.test(value) ? '' : t('login.invalidEmail'));
  };

  const handlePassChange = (e) => {
    const value = e.target.value;
    setPass(value);
    setPassError(value.length >= 6 ? '' : t('login.minPass'));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: user,
      password: pass,
    });
    if (!error) {
      setMessage(t('login.success'));
      navigate("/dashboard");
    } else {
      setMessage(t('login.error'));
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="login-leftPanel">
        <div className="logoCircle">
          <img src={logo} alt="logo" width="40" />
        </div>
        <h2 className="welcome">{t('login.welcome')}</h2>
        <p className="desc">{t('login.desc')}</p>
      </div>
      <div className="login-rightPanel">
        <h2 className="loginTitle">{t('login.title')}</h2>
        <p className="loginDesc">{t('login.formDesc')}</p>
        <form className="form" onSubmit={handleSubmit} aria-label={t('login.title')}>
          <label className="label" htmlFor="username">{t('login.email')}</label>
          <div className="inputIcon">
            <input
              className="input"
              id="username"
              type="email"
              value={user}
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
          <label className="label" htmlFor="password">{t('login.password')}</label>
          <div className="inputIcon">
            <input
              className="input"
              id="password"
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={handlePassChange}
              required
            />
            <button
              type="button"
              className="iconEye"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? t('login.hidePass') : t('login.showPass')}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passError && (
            <div style={{ color: 'red' }} aria-live="polite">
              {passError}
            </div>
          )}
          <button className="loginBtn" type="submit">{t('login.submit')}</button>
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
          {t('login.noAccount')}
          <Link className="registerLink" to="/register">{t('login.register')}</Link>
        </p>
      </div>
    </div>
  );
}
