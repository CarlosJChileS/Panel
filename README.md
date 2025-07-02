# Dashboard Ambiental Costero

Demostración de un sistema de monitoreo ambiental con **React** y **Express**. Utiliza Supabase para almacenar usuarios y datos de ejemplo. El repositorio se organiza en dos carpetas principales: `frontend` y `backend`.

La interfaz es **responsiva** y dispone de un panel de accesibilidad que ajusta contraste, tamaño de texto y otros efectos de acuerdo con las pautas **WCAG&nbsp;2.2**. Todas las vistas posteriores al inicio están protegidas mediante inicio de sesión.

## Requisitos
- Node.js 18 o superior
- Cuenta de Supabase con las claves de proyecto
- Docker (opcional, para ejecución en contenedores)
- Clave de API de OpenWeatherMap para obtener datos meteorológicos

## Instalación manual
### Frontend
1. Crea un archivo `frontend/.env` con las variables:
   - `REACT_APP_OPENWEATHER_KEY`
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_KEY`
2. Instala las dependencias:
   ```bash
   npm install --force --prefix frontend
   ```
3. Ejecuta en modo desarrollo:
   ```bash
   npm start --prefix frontend
   ```
   Abrirá `http://localhost:3000`.

### Backend
1. Dentro de `backend` crea un archivo `.env` con:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `PORT` (opcional, 4000 por defecto)
2. Instala las dependencias:
   ```bash
   npm install --prefix backend
   ```
3. Inicia el servidor:
   ```bash
   npm start --prefix backend
   ```
   Disponibl​e en `http://localhost:4000`.

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

## Rutas principales

Estas son las rutas disponibles en el frontend. Salvo el inicio, login y registro, todas requieren autenticación:

| Ruta | Descripción |
|------|-------------|
| `/` | Página de bienvenida |
| `/login` | Formulario de acceso |
| `/register` | Registro de nuevos usuarios |
| `/dashboard` | Panel de condiciones actuales |
| `/aire` | Calidad del aire |
| `/extras` | Condiciones adicionales |
| `/mapa` | Mapa con ubicación |
| `/alertas` | Alertas de clima |
| `/estadisticas` | Estadísticas históricas |
| `/contacto` | Información de contacto |
| `/profile` | Perfil y preferencias |
| `/admin` | Panel de administración (solo usuarios administradores) |

El backend expone además `/status` para comprobar la conexión con Supabase.

## Pruebas
Para ejecutar la suite de tests del frontend utiliza:
```bash
CI=true npm test --silent --runInBand --prefix frontend
```

## Licencia
Este proyecto se distribuye bajo la licencia MIT incluida en el repositorio.
