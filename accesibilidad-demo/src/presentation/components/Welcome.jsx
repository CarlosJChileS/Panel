import React from "react";
import { Link } from "react-router-dom";
import "../../Dashboard.css";

export default function Welcome() {
  return (
    <div className="dashboard-container dashboard-bg" style={{paddingTop: '60px'}}>
      <main className="search-section-center" aria-labelledby="welcome-title">
        <div className="search-box" role="region" aria-label="Bienvenida">
          <h2 id="welcome-title" className="search-box-title">
            Bienvenido al Dashboard Ambiental Costero
          </h2>
          <p>Utiliza el menú para navegar por las secciones.</p>
          <Link to="/dashboard" className="city-form-horizontal" style={{justifyContent: 'center'}}>
            <button type="button">Ir al Dashboard</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
