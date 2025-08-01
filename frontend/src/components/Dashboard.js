import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../DashboardAmbiente.css';
import { useWeather } from '../hooks/useWeather';
import Header from './Header';
import RealTimeMap from './RealTimeMap';
import { mockWeather } from '../data/mockWeather';

export default function Dashboard() {
  const { weather, loading, error, search, city, setCity } = useWeather();
  const [queryType, setQueryType] = React.useState('Datos Completos');

  const showSection = (section) =>
    queryType === 'Datos Completos' || queryType === section;

  const aqi = weather.air.uaqi || weather.air.aqi || '-';
  const aqiCategory = weather.air.uaqiCategory || 'Moderado';

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  const handleClear = () => {
    setCity('');
    setQueryType('Datos Completos');
  };

  const lastUpdate = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const humedadNum = parseFloat(weather.humidity) || 0;

  const trend7 = [
    { day: 'Lun', aqi: 60 },
    { day: 'Mar', aqi: 58 },
    { day: 'Mié', aqi: 55 },
    { day: 'Jue', aqi: 53 },
    { day: 'Vie', aqi: 52 },
    { day: 'Sáb', aqi: 50 },
    { day: 'Dom', aqi: 48 },
  ];

  return (
    <div className="dashboard-amb dashboard">
      <Header />

      <section className="consulta-personalizada">
        <h3>Consulta Personalizada de Datos</h3>
        <p>Busca información específica por ubicación y obtén datos detallados</p>
        <div className="consulta-form">
          <input
            placeholder="Ej: Madrid, ES o 40.4168,-3.7038"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
            <option>Datos Completos</option>
            <option>Aire</option>
            <option>Condiciones Extras</option>
            <option>Mapa</option>
            <option>Estadísticas</option>
          </select>
          <button className="consulta-btn" onClick={handleSubmit}>
            Consultar Ahora
          </button>
          <button className="consulta-limpiar" type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
        {loading && <p>Consultando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>

      {showSection('Datos Completos') && (
      <section className="estado-real">
        <h2>Estado Ambiental en Tiempo Real</h2>
        <p className="estado-sub">
          {city || 'Ubicación'} · Última actualización: Hoy {lastUpdate}
        </p>
        <div className="estado-cards">
          <div className="card temperatura">
            <div className="icon" />
            <div className="main">{weather.temperature || '-'}</div>
            <div className="desc">
              Sensación térmica: {weather.extras.feelsLike || '-'}
            </div>
            {weather.extras.tempMin && weather.extras.tempMax && (
              <div className="rango">
                Rango: {weather.extras.tempMin} - {weather.extras.tempMax}
              </div>
            )}
          </div>
          <div className="card aire">
            <div className="icon" />
            <div className="main">{aqi}</div>
            <div className="desc">Índice AQI - {aqiCategory}</div>
            {weather.air.pm25 && (
              <div className="rango">PM2.5: {weather.air.pm25} µg/m³</div>
            )}
          </div>
          <div className="card extra">
            <div className="icon" />
            <div className="main">{weather.humidity || '-'}</div>
            <div className="desc">Humedad relativa</div>
            {weather.extras.clouds && (
              <div className="rango">Nubosidad: {weather.extras.clouds}</div>
            )}
          </div>
          <div className="card presion">
            <div className="icon" />
            <div className="main">{weather.pressure || '-'}</div>
            <div className="desc">Presión hPa</div>
          </div>
          <div className="card viento">
            <div className="icon" />
            <div className="main">{weather.wind || '-'}</div>
            <div className="desc">Dirección: {weather.extras.sky || '-'}</div>
          </div>
        </div>
        <div className="estado-alerta moderado">
          <span>{weather.alerts?.uaqi || 'MODERADO'}</span> Precaución recomendada
        </div>
      </section>
      )}


      {showSection('Condiciones Extras') && (
      <section className="condiciones-climaticas">
        <h4>Condiciones Climáticas</h4>
        <div className="clima-datos">
          <div>
            <span>Humedad Relativa</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${humedadNum}%` }} />
              <span>{weather.humidity || '-'}</span>
            </div>
          </div>
          <div>
            <span>Presión Atmosférica</span>
            <div className="valor">{weather.pressure || '-'}</div>
          </div>
          <div>
            <span>Visibilidad</span>
            <div className="valor">{weather.extras.visibility || '-'}</div>
          </div>
          <div>
            <span>Índice UV</span>
            <div className="valor uv">-</div>
          </div>
        </div>
      </section>
      )}

      {showSection('Aire') && (
      <section className="monitoreo-aire">
        <h4>Monitoreo de Calidad del Aire</h4>
        <div className="card-aqi">
          <div className="aqi-value">{aqi} AQI</div>
          <div className="aqi-alerta moderado">{aqiCategory.toUpperCase()}</div>
          <p>
            Grupos sensibles deben limitar actividades prolongadas al aire libre
          </p>
          <div className="contaminantes">
            <div>
              <span>PM2.5</span>
              <span>{weather.air.pm25 || '-'} µg/m³</span>
            </div>
            <div>
              <span>NO₂</span>
              <span>{weather.air.no2 || '-'} µg/m³</span>
            </div>
            <div>
              <span>O₃</span>
              <span>{weather.air.ozone || '-'} µg/m³</span>
            </div>
          </div>
        </div>
      </section>
      )}

      {showSection('Datos Completos') && (
      <section className="sistema-alertas">
        <h4>Sistema de Alertas Inteligente</h4>
        <div className="alerta critica">
          <b>PM2.5 Nivel {weather.alerts?.air === 'ALTA' ? 'Peligroso' : 'Seguro'}</b>
          <span>
            PM2.5: {weather.air.pm25 || '-'} µg/m³ (Límite OMS: 15 µg/m³)
          </span>
          <div className="tiempo">Actual</div>
        </div>
        <div className="alerta moderada">
          <b>
            Temperatura {parseFloat(weather.temperature) >= 25 ? 'Elevada' : 'Normal'}
          </b>
          <span>
            {city || 'Ubicación'}: {weather.temperature || '-'} (Umbral: 25°C)
          </span>
          <div className="tiempo">Actual</div>
        </div>
        <div className="alerta buena">
          <b>Condiciones Favorables</b>
          <span>Cielo {weather.extras.sky || '-'}</span>
        </div>
      </section>
      )}

      {showSection('Mapa') && (
      <section className="mapa-estaciones">
        <h4>Mapa de Estaciones en Tiempo Real</h4>
        <div className="mapa-interactivo">
          <RealTimeMap
            lat={weather.lat || mockWeather.lat}
            lon={weather.lon || mockWeather.lon}
            height="200px"
          />
        </div>
        <div className="estaciones-relevantes">
          <b>Estaciones Más Relevantes</b>
          <ul>
            <li className="ok">Centro Histórico Valencia <span>AQI: 45 · 23°C</span></li>
            <li className="mod">Puerto Comercial <span>AQI: 78 · 24°C</span></li>
            <li className="alert">Zona Industrial Norte <span>AQI: 95 · 25°C</span></li>
          </ul>
        </div>
      </section>
      )}

      {showSection('Estadísticas') && (
      <section className="analisis-tendencias">
        <h4>Análisis de Tendencias Inteligente</h4>
        <div className="grafica">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trend7} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="aqi" stroke="#8884d8" name="AQI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="insights">
          <div className="insight ok">
            Mejora Progresiva: la calidad del aire ha mejorado un 12% esta semana
          </div>
          <div className="insight mod">
            Patrón Horario Detectado: picos de contaminación entre 7-9 AM y 18-20 PM
          </div>
        </div>
      </section>
      )}

      {showSection('Datos Completos') && (
      <section className="recomendaciones">
        <h4>Recomendaciones Inteligentes</h4>
        <div className="reco-card">Personalizadas según las condiciones actuales</div>
      </section>
      )}
    </div>
  );
}
