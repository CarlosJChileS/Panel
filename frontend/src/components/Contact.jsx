import React from 'react';
import Header from './Header';
import '../Dashboard.css';

export default function Contact() {
  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="contact-title">
          <div className="search-box">
            <h2 id="contact-title" className="search-box-title">Contacto</h2>
            <p>Para consultas escribe a <a href="mailto:info@example.com">info@example.com</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
