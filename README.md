# Dashboard Ambiental Costero

Este repositorio contiene una demostración de un panel de monitoreo ambiental compuesto por un **frontend en React** y un **backend en Express**. Supabase se utiliza como base de datos y servicio de autenticación. El proyecto está dividido en dos carpetas: `frontend` y `backend`.

## Requisitos
- Node.js 18 o superior
- Cuenta de Supabase con las claves de proyecto
- Docker (opcional, para ejecución en contenedores)

## Instalación manual
### Frontend
1. Copia el archivo `frontend/.env` y coloca tus datos de `REACT_APP_OPENWEATHER_KEY`, `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_KEY`.
2. Instala las dependencias ejecutando:
   ```bash
   npm install --force --prefix frontend
   ```
3. Inicia el servidor de desarrollo con:
   ```bash
   npm start --prefix frontend
   ```
   La aplicación estará disponible en `http://localhost:3000`.

### Backend
1. Crea un archivo `.env` en `backend` a partir de `backend/.env.sample` y completa `SUPABASE_URL`, `SUPABASE_KEY` y `PORT`.
2. Instala las dependencias:
   ```bash
   npm install --prefix backend
   ```
3. Ejecuta el servidor:
   ```bash
   npm start --prefix backend
   ```
   Escuchará en `http://localhost:4000`.

## Uso con Docker
1. Construye la imagen del frontend desde la raiz del proyecto:
   ```bash
   docker build -t dashboard-frontend .
   ```
2. Ejecuta el contenedor de la interfaz:
   ```bash
   docker run -p 3000:80 dashboard-frontend
   ```
   La aplicación quedará disponible en `http://localhost:3000`.

## Base de datos
En la carpeta `scripts` encontrarás `supabase_schema.sql` con el script para crear todas las tablas necesarias (usuarios, ciudades, historial de consultas y condiciones climáticas). Ejecútalo en tu proyecto de Supabase antes de usar la aplicación.

## Pruebas
Para ejecutar la suite de tests del frontend utiliza:
```bash
CI=true npm test --silent --runInBand --prefix frontend
```

## Licencia
Este proyecto se distribuye bajo la licencia MIT incluida en el repositorio.
