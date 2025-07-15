import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../SearchSections.css';

const SECTIONS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Calidad Aire', path: '/aire' },
  { name: 'Condiciones Extra', path: '/extras' },
  { name: 'Mapa', path: '/mapa' },
  { name: 'Alertas', path: '/alertas' },
  { name: 'Estadísticas', path: '/estadisticas' },
  { name: 'Contacto', path: '/contacto' },
];

export default function SearchSections() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = SECTIONS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length) navigate(results[0].path);
  };

  return (
    <form className="section-search" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
      />
      <button type="submit">Go</button>
      {query && (
        <ul className="section-results">
          {results.map((r) => (
            <li key={r.path} onClick={() => navigate(r.path)}>{r.name}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
