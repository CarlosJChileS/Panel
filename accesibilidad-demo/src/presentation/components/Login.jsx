import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../Landing.css";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { supabase } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: user,
      password: pass,
    });
    if (!error) navigate("/dashboard");
  }

  return (
    <div className="dashboard-bg">
      <div className="central-panel" style={{ maxWidth: '400px' }}>
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
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
