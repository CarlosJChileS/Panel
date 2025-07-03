import React from 'react';
import Header from './Header';
import '../Dashboard.css';
import '../Profile.css';

export default function Contact() {
  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="contact-title">
          <div className="search-box" style={{textAlign:'left'}}>
            <h2 id="contact-title" className="search-box-title" style={{textAlign:'center'}}>Contacto</h2>
            <p>¿Tienes dudas o comentarios? Estamos disponibles en:</p>
            <ul style={{marginLeft:20}}>
              <li>Correo: <a href="mailto:info@example.com">info@example.com</a></li>
              <li>Teléfono: <a href="tel:+593991112233">+593&nbsp;99&nbsp;111&nbsp;2233</a></li>
              <li>Dirección: Calle Principal 123, Manta, Ecuador</li>
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Reporte enviado');
                e.target.reset();
              }}
              className="contact-form"
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
              className="contact-form"
            >
              <h3 className="card-title">Enviar consejo</h3>
              <label htmlFor="tips-msg">Comentario</label>
              <textarea id="tips-msg" required style={{ width: '100%', minHeight: 80 }} />
              <button type="submit" style={{ marginTop: 8 }}>Enviar</button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Mensaje enviado');
                e.target.reset();
              }}
              className="contact-form"
            >
              <h3 className="card-title">Contacto directo</h3>
              <label htmlFor="contact-msg">Tu mensaje</label>
              <textarea id="contact-msg" required style={{ width: '100%', minHeight: 80 }} />
              <button type="submit" style={{ marginTop: 8 }}>Enviar</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
