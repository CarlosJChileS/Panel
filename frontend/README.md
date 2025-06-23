# Dashboard Ambiental Costero

Este proyecto es una demostración de un panel ambiental construido con React. La aplicación se organiza de forma simple dentro de la carpeta `frontend` sin seguir Clean Architecture.

## Accesibilidad

Se han incorporado buenas prácticas de accesibilidad para cumplir con las pautas **WCAG 2.2 nivel AA** y las normas **ISO 9241‑210** e **ISO/IEC 25010**:

- Uso de etiquetas y roles ARIA en formularios y controles interactivos.
- Estados visuales con contraste suficiente y texto alternativo para no depender solo del color.
- Navegación mediante teclado garantizada con focos visibles en todos los elementos interactivos.
- Estructura semántica con encabezados y regiones claramente identificadas.

## Instalación y pruebas

1. Copia el archivo `.env` y coloca tu clave en `REACT_APP_OPENWEATHER_KEY` para obtener datos reales.
2. Ejecuta `npm install --force` dentro del directorio `frontend` para instalar las dependencias.
3. Para las pruebas automáticas usa `CI=true npm test --silent --runInBand`.

## Ejecución

```bash
npm start --prefix frontend
```

La aplicación se abrirá en `http://localhost:3000`.

## Licencia

Este proyecto se publica bajo la licencia MIT incluida en este repositorio.
