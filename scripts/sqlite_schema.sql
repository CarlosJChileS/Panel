-- SQLite version of the database schema. Mirrors Supabase tables.
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT,
    lat REAL,
    lon REAL
);

CREATE TABLE IF NOT EXISTS consults (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    city_id INTEGER REFERENCES cities(id),
    consulted_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS weather_conditions (
    id TEXT PRIMARY KEY,
    consult_id TEXT UNIQUE REFERENCES consults(id),
    temperatura REAL,
    humedad REAL,
    viento REAL,
    presion_atmosferica REAL
);

CREATE TABLE IF NOT EXISTS air_quality (
    id TEXT PRIMARY KEY,
    consult_id TEXT UNIQUE REFERENCES consults(id),
    monoxido_de_carbono REAL,
    dioxido_de_nitrogeno REAL,
    ozono REAL,
    particulas_pm25 REAL
);

CREATE TABLE IF NOT EXISTS additional_conditions (
    id TEXT PRIMARY KEY,
    consult_id TEXT UNIQUE REFERENCES consults(id),
    sensacion_termica REAL,
    estado_del_cielo TEXT,
    nubosidad REAL,
    visibilidad REAL
);

CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    consult_id TEXT REFERENCES consults(id),
    alerta TEXT
);

CREATE INDEX IF NOT EXISTS idx_consult_user ON consults(user_id);
CREATE INDEX IF NOT EXISTS idx_consult_city ON consults(city_id);
CREATE INDEX IF NOT EXISTS idx_weather_consult ON weather_conditions(consult_id);
CREATE INDEX IF NOT EXISTS idx_air_consult ON air_quality(consult_id);
CREATE INDEX IF NOT EXISTS idx_additional_consult ON additional_conditions(consult_id);
CREATE INDEX IF NOT EXISTS idx_alert_consult ON alerts(consult_id);
