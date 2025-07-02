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
            <p>Teléfono: <a href="tel:+593991112233">+593&nbsp;99&nbsp;111&nbsp;2233</a></p>
            <p>Dirección: Calle Principal 123, Manta, Ecuador</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Reporte enviado');
                e.target.reset();
              }}
              style={{ width: '100%', marginTop: 16 }}
            >
              <h3 className="card-title">Reportar error</h3>
              <label htmlFor="err-msg">Descripción</label>
              <textarea id="err-msg" required style={{ width: '100%', minHeight: 80 }} />
              <button type="submit" style={{ marginTop: 8 }}>Enviar</button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Gracias por tu sugerencia');
                e.target.reset();
              }}
              style={{ width: '100%', marginTop: 24 }}
            >
              <h3 className="card-title">Enviar consejo</h3>
              <label htmlFor="tips-msg">Comentario</label>
              <textarea id="tips-msg" required style={{ width: '100%', minHeight: 80 }} />
              <button type="submit" style={{ marginTop: 8 }}>Enviar</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
