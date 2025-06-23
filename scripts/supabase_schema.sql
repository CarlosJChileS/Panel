
-- Usuarios del sistema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Catálogo de ciudades
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION
);

-- Consulta individual del usuario
CREATE TABLE consults (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    city_id INTEGER REFERENCES cities(id),
    consulted_at TIMESTAMPTZ DEFAULT now()
);

-- Condiciones climáticas (1:1 con consult)
CREATE TABLE weather_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consult_id UUID REFERENCES consults(id) UNIQUE,
    temperatura DOUBLE PRECISION,
    humedad DOUBLE PRECISION,
    viento DOUBLE PRECISION,
    presion_atmosferica DOUBLE PRECISION
);

-- Calidad del aire (1:1 con consult)
CREATE TABLE air_quality (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consult_id UUID REFERENCES consults(id) UNIQUE,
    monoxido_de_carbono DOUBLE PRECISION,
    dioxido_de_nitrogeno DOUBLE PRECISION,
    ozono DOUBLE PRECISION,
    particulas_pm25 DOUBLE PRECISION
);

-- Condiciones adicionales (1:1 con consult)
CREATE TABLE additional_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consult_id UUID REFERENCES consults(id) UNIQUE,
    sensacion_termica DOUBLE PRECISION,
    estado_del_cielo TEXT,
    nubosidad DOUBLE PRECISION,
    visibilidad DOUBLE PRECISION
);

-- Alertas (1:N con consult)
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consult_id UUID REFERENCES consults(id),
    alerta TEXT
);

-- Índices recomendados
CREATE INDEX idx_consult_user ON consults(user_id);
CREATE INDEX idx_consult_city ON consults(city_id);
CREATE INDEX idx_weather_consult ON weather_conditions(consult_id);
CREATE INDEX idx_air_consult ON air_quality(consult_id);
CREATE INDEX idx_additional_consult ON additional_conditions(consult_id);
CREATE INDEX idx_alert_consult ON alerts(consult_id);
