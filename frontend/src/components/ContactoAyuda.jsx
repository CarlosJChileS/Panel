import React, { useState } from 'react';
import '../ContactoAyuda.css';
import Header from './Header';

export default function ContactoAyuda() {
  const [errorSent, setErrorSent] = useState(false);
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [directSent, setDirectSent] = useState(false);
  return (
    <div className="dashboard-bg">
      <Header />
      <div className="contacto-main">
      {/* Encabezado */}
      <div className="contacto-header">
        <div className="contacto-header-icon">?</div>
        <h2>Centro de Ayuda y Contacto</h2>
        <p>¿Tienes dudas o comentarios? Estamos disponibles para ayudarte</p>
        <div className="contacto-btns">
          <button className="btn-mail">Email</button>
          <button className="btn-phone">Teléfono</button>
          <button className="btn-live">Chat en Vivo</button>
        </div>
      </div>

      <div className="contacto-grid">
        {/* Columna Izquierda */}
        <div className="contacto-col">
          {/* Información de Contacto */}
          <div className="info-contacto">
            <h4>Información de Contacto</h4>
            <div className="info-card email">
              <div className="icon">&#9993;</div>
              <div>
                <b>Correo Electrónico</b>
                <div>
                  <a href="mailto:info@dashboardambiental.com">info@dashboardambiental.com</a>
                  <span className="info-mini">Respuesta en 24 horas</span>
                </div>
              </div>
            </div>
            <div className="info-card phone">
              <div className="icon">&#128222;</div>
              <div>
                <b>Teléfono de Soporte</b>
                <div>
                  <span>+593 99 111 2233</span>
                  <span className="info-mini">Lunes a Viernes 8:30 - 18:00</span>
                </div>
              </div>
            </div>
            <div className="info-card location">
              <div className="icon">&#127968;</div>
              <div>
                <b>Oficina Principal</b>
                <div>
                  <span>Calle Principal 123, Manta, Ecuador</span>
                  <span className="info-mini">Atención presencial con cita previa</span>
                </div>
              </div>
            </div>
          </div>
          {/* Preguntas Frecuentes */}
          <div className="faq">
            <h4>Preguntas Frecuentes</h4>
            <div className="faq-item">
              <b>¿Con qué frecuencia se actualizan los datos?</b>
              <span>Los datos se actualizan cada 10 minutos automáticamente</span>
            </div>
            <div className="faq-item">
              <b>¿Cómo configuro las alertas personalizadas?</b>
              <span>Accede al módulo de Alertas y activa los eventos que necesites.</span>
            </div>
            <div className="faq-item">
              <b>¿Los datos son gratuitos para uso público?</b>
              <span>Sí, todos los datos son de acceso público y gratuitos.</span>
            </div>
            <button className="btn-faq">Ver Todas las FAQ</button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="contacto-col-right">
          {/* Reportar Error */}
          <div className="form-card form-error">
            <h4>
              <span className="icon">&#9888;</span> Reportar Error
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!window.confirm('¿Enviar el reporte?')) return;
                setErrorSent(true);
                e.target.reset();
              }}
            >
              <label>
                Tipo de Error *
                <select required>
                  <option value="">Selecciona el tipo de error</option>
                  <option value="datos">Error en datos</option>
                  <option value="visual">Error visual</option>
                  <option value="acceso">Problema de acceso</option>
                </select>
              </label>
              <label>
                Descripción del Error *
                <textarea placeholder="Describe detalladamente el error encontrado..." required></textarea>
              </label>
              <label>
                Tu Email (opcional)
                <input type="email" placeholder="tu@email.com" />
              </label>
              <div className="form-actions">
                <button className="btn-report" type="submit">
                  &#9993; Enviar Reporte
                </button>
                <button
                  className="btn-cancel"
                  type="button"
                  onClick={(e) => {
                    setErrorSent(false);
                    e.target.form.reset();
                  }}
                >
                  Cancelar
                </button>
              </div>
              {errorSent && (
                <div className="confirm-msg" aria-live="polite">
                  Reporte enviado
                </div>
              )}
            </form>
          </div>

          {/* Sugerencias */}
          <div className="form-card form-sugerencia">
            <h4>
              <span className="icon">&#128161;</span> Enviar Consejo o Sugerencia
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!window.confirm('¿Enviar la sugerencia?')) return;
                setSuggestionSent(true);
                e.target.reset();
              }}
            >
              <label>
                Categoría *
                <select required>
                  <option value="funcionalidad">Mejora de funcionalidad</option>
                  <option value="visual">Mejora visual</option>
                  <option value="otra">Otra</option>
                </select>
              </label>
              <label>
                Tu Comentario o Sugerencia *
                <textarea placeholder="Comparte tu idea para mejorar el sistema..." required></textarea>
              </label>
              <label>
                Tu Email (opcional)
                <input type="email" placeholder="tu@email.com" />
              </label>
              <div className="form-actions">
                <button className="btn-sugerencia" type="submit">
                  &#9993; Enviar Sugerencia
                </button>
                <button
                  className="btn-cancel"
                  type="button"
                  onClick={(e) => {
                    setSuggestionSent(false);
                    e.target.form.reset();
                  }}
                >
                  Cancelar
                </button>
              </div>
              {suggestionSent && (
                <div className="confirm-msg" aria-live="polite">
                  Sugerencia enviada
                </div>
              )}
            </form>
          </div>

          {/* Contacto Directo */}
          <div className="form-card form-directo">
            <h4>
              <span className="icon">&#128233;</span> Contacto Directo
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!window.confirm('¿Enviar el mensaje?')) return;
                setDirectSent(true);
                e.target.reset();
              }}
            >
              <label>
                Nombre Completo *
                <input type="text" placeholder="Tu nombre completo" required />
              </label>
              <label>
                Email *
                <input type="email" placeholder="tu@email.com" required />
              </label>
              <label>
                Teléfono
                <input type="tel" placeholder="Opcional" />
              </label>
              <label>
                Mensaje *
                <textarea placeholder="Escribe tu mensaje" required></textarea>
              </label>
              <div className="form-actions">
                <button className="btn-sugerencia" type="submit">
                  Enviar Mensaje
                </button>
                <button
                  className="btn-cancel"
                  type="button"
                  onClick={(e) => {
                    setDirectSent(false);
                    e.target.form.reset();
                  }}
                >
                  Cancelar
                </button>
              </div>
              {directSent && (
                <div className="confirm-msg" aria-live="polite">
                  Mensaje enviado
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
