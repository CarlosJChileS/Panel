import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../Landing.css";
import { useAuth } from "../AuthContext";
import { useSupabaseStatus } from "../../application/hooks/useSupabaseStatus";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const status = useSupabaseStatus();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: user,
      password: pass,
    });
    if (!error) {
      setMessage("Login exitoso");
      navigate("/dashboard");
    } else {
      setMessage("Error al iniciar sesión");
    }
    setLoading(false);
  }

  return (
    <div className="dashboard-bg auth-container">
      <div className="central-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="welcome-title" id="login-title">Iniciar Sesión</h1>
        <form className="login-form" onSubmit={handleSubmit} aria-label="Iniciar sesión">
          <label htmlFor="username">Correo</label>
          <input
            id="username"
            type="email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        {loading && <div className="loader" role="status" aria-label="Cargando"></div>}
        {message && <div className="status-message">{message}</div>}
        {status === 'error' && (
          <div className="status-message" style={{ color: 'red' }}>
            Error de conexión con Supabase
          </div>
        )}
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
