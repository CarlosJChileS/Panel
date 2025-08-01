# Dashboard Ambiental Costero

Demostración de un sistema de monitoreo ambiental con **React** y **Express**. Utiliza **SQLite** para almacenar usuarios y datos de ejemplo. Se mantiene el esquema original para Supabase como referencia. El repositorio se organiza en dos carpetas principales: `frontend` y `backend`.

La interfaz es **responsiva** y dispone de un panel de accesibilidad que ajusta contraste, tamaño de texto y otros efectos de acuerdo con las pautas **WCAG 2.2**. El panel incluye un boton para *restablecer parametros*. Consulta el documento [Usability Checklist](USABILITY_CHECKLIST.md) para ver las practicas aplicadas.

## Requisitos
- Node.js 18 o superior
- Docker (opcional, para ejecución en contenedores)
- Clave de API de OpenWeatherMap para obtener datos meteorológicos

## Instalación manual
### Frontend
1. Crea un archivo `frontend/.env` con las variables:
   - `REACT_APP_OPENWEATHER_KEY`
   - `REACT_APP_GOOGLEAIR_KEY`
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
   - `DB_FILE` (opcional, ruta del archivo SQLite)
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
En la carpeta `scripts` encontrarás `sqlite_schema.sql` con el esquema que se usa localmente y `supabase_schema.sql` para la versión en Supabase. Ambos definen las mismas tablas (usuarios, ciudades, historial de consultas y condiciones climáticas).
Las secciones de Aire, Extras, Mapa, Alertas, Estadísticas y Contacto muestran información detallada obtenida de OpenWeatherMap. La página de Contacto cuenta además con formularios para reportar errores y dejar sugerencias.

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

El backend expone además `/status` para comprobar la conexión con la base de datos.

## Pruebas
Para ejecutar la suite de tests del frontend utiliza:
```bash
CI=true npm test --silent --runInBand --prefix frontend
```

## Licencia
Este proyecto se distribuye bajo la licencia MIT incluida en el repositorio.
