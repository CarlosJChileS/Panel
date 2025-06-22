# Dashboard Ambiental Costero

Este proyecto es una demostración de un panel ambiental construido con React. La aplicación se organiza siguiendo principios de **Clean Architecture** donde la lógica de dominio y servicios se ubican en carpetas específicas y los componentes de interfaz son puramente presentacionales.

## Accesibilidad

Se han incorporado buenas prácticas de accesibilidad para cumplir con las pautas **WCAG 2.2 nivel AA** y las normas **ISO 9241‑210** e **ISO/IEC 25010**:

- Uso de etiquetas y roles ARIA en formularios y controles interactivos.
- Estados visuales con contraste suficiente y texto alternativo para no depender solo del color.
- Navegación mediante teclado garantizada con focos visibles en todos los elementos interactivos.
- Estructura semántica con encabezados y regiones claramente identificadas.

## Instalación y pruebas

1. Copia el archivo `.env` y coloca tu clave en `REACT_APP_OPENWEATHER_KEY` para obtener datos reales.
2. Ejecuta `npm install --force` dentro del directorio `accesibilidad-demo` para instalar las dependencias.
3. Para las pruebas automáticas usa `CI=true npm test --silent --runInBand`.

## Ejecución

```bash
npm start --prefix accesibilidad-demo
```

La aplicación se abrirá en `http://localhost:3000`.

## Licencia

Este proyecto se publica bajo la licencia MIT incluida en este repositorio.
