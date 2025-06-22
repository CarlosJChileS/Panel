import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Dashboard.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="dashboard-container dashboard-bg" style={{ paddingTop: "60px" }}>
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
        </div>
      </main>
    </div>
  );
}
