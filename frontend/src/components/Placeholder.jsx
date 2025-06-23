import React from "react";
import "../Landing.css";
import "../Dashboard.css";
import Header from "./Header";

export default function Placeholder({ title }) {
  return (
    <div className="dashboard-bg">
      <Header />
      <main className="search-section-center" aria-labelledby="placeholder-title" style={{paddingTop: '20px'}}>
        <div className="search-box" role="region" aria-label={title}>
          <h2 id="placeholder-title" className="search-box-title">{title}</h2>
          <p>Sección en desarrollo</p>
        </div>
      </main>
    </div>
  );
}
