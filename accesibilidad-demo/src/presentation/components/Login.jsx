import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../Dashboard.css";
import Header from "./Header";
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
    <div className="dashboard-container dashboard-bg" style={{ paddingTop: "60px" }}>
      <Header />
      <main className="search-section-center" aria-labelledby="login-title">
        <div className="search-box" role="region" aria-label="Iniciar sesión">
          <h2 id="login-title" className="search-box-title">
            Iniciar Sesión
          </h2>
          <form className="city-form-horizontal" onSubmit={handleSubmit} style={{ flexDirection: 'column', gap: '12px' }}>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
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
      </main>
    </div>
  );
}
