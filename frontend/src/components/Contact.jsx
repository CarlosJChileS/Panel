import React, { useState } from 'react';
import Header from './Header';
import '../Dashboard.css';
import '../Profile.css';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <section className="search-section-center" aria-labelledby="contact-title">
          <div className="search-box" style={{textAlign:'left'}}>
            <h2 id="contact-title" className="search-box-title" style={{textAlign:'center'}}>{t('contact.title')}</h2>
            <p>{t('contact.intro')}</p>
            <ul style={{marginLeft:20}}>
              <li>Correo: <a href="mailto:info@example.com">info@example.com</a></li>
              <li>Teléfono: <a href="tel:+593991112233">+593&nbsp;99&nbsp;111&nbsp;2233</a></li>
              <li>Dirección: Calle Principal 123, Manta, Ecuador</li>
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                e.target.reset();
              }}
              className="contact-form"
            >
              <h3 className="card-title">{t('contact.direct')}</h3>
              <label htmlFor="contact-name">{t('contact.name')}</label>
              <input id="contact-name" type="text" required autoComplete="name" style={{ width: '100%' }} />
              <label htmlFor="contact-email">{t('contact.email')}</label>
              <input id="contact-email" type="email" required autoComplete="email" style={{ width: '100%' }} />
              <label htmlFor="contact-subject">{t('contact.subject')}</label>
              <input id="contact-subject" type="text" required style={{ width: '100%' }} />
              <label htmlFor="contact-msg">{t('contact.message')}</label>
              <textarea id="contact-msg" required style={{ width: '100%', minHeight: 80 }} />
              <button type="submit" style={{ marginTop: 8 }}>{t('contact.send')}</button>
              {sent && (
                <div style={{ color: 'green', marginTop: 8 }} aria-live="polite">
                  {t('contact.sent')}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
