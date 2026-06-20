# Migración: GitHub Pages → Netlify

## Fecha
20 Junio 2026

## Motivación
- URL más limpia: `last-angel-web.netlify.app` vs `dev-valis137.github.io/last-angel-web/`
- Deploy automático desde GitHub (cada push a `main`)
- Deploy previews en cada Pull Request
- Formularios nativos con Netlify Forms (sin depender de Formspree)
- CDN global con mejor performance
- Posibilidad de agregar Serverless Functions en el futuro

## Cambios realizados

### `vite.config.js`
- `base: '/'` en lugar de `'/last-angel-web/'`

### `package.json`
- Eliminado script `"deploy": "npm run build && gh-pages -d dist"`
- Eliminada dependencia `"gh-pages": "^6.3.0"` de devDependencies

### `netlify.toml` (nuevo)
Configura build command y publish directory, más redirect SPA.

### `index.html`
- Actualizada sección #web: GitHub Pages + Formspree → Netlify

## Cómo conectar el repo a Netlify
1. Ir a [netlify.com](https://netlify.com) e iniciar sesión con GitHub
2. **Add new site → Import existing project → Deploy with GitHub**
3. Seleccionar `Dev-Valis137/last-angel-web`
4. Netlify detecta automáticamente:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy site**

## Comandos útiles
```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build local
```
