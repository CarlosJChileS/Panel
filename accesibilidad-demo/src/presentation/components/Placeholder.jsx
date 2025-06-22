import React from "react";
import "../../Dashboard.css";

export default function Placeholder({ title }) {
  return (
    <div className="dashboard-container dashboard-bg" style={{paddingTop: '60px'}}>
      <main className="search-section-center" aria-labelledby="placeholder-title">
        <div className="search-box" role="region" aria-label={title}>
          <h2 id="placeholder-title" className="search-box-title">{title}</h2>
          <p>Sección en desarrollo</p>
        </div>
      </main>
    </div>
  );
}
