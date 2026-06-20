# last-angel-web

## Descripción
Página web del sistema de juego para el servidor de rol **LAST ANGEL · ARKHAM**. Reglas, economía, combate, perks y progresión.

## Stack
- **Framework:** React 19
- **Build tool:** Vite 8
- **Animaciones:** Framer Motion
- **Hosting:** Netlify (deploy automático desde GitHub)

## Comandos
```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview del build
```

## Estructura
```
├── index.html          # HTML principal con todo el contenido
├── styles.css          # Estilos globales
├── src/
│   ├── main.jsx        # Entry point React
│   ├── CustomCursor.jsx
│   ├── GravityStarsBackground.jsx
│   ├── ThemeTogglerButton.jsx
│   ├── useTheme.js
│   └── data/           # Datos de documentación
├── public/
│   └── script.js       # JS vanilla (scroll reveal, spotlight)
├── vite.config.js
├── netlify.toml        # Config Netlify
└── docs/
    └── MIGRACION_NETLIFY.md
```

## Deployment
- **URL:** `https://last-angel-web.netlify.app`
- **Repo:** `Dev-Valis137/last-angel-web`
- Cada push a `main` hace build + deploy automático
- PRs generan preview URLs automáticas

## Convenciones
- HTML vanilla con CSS custom properties (modo dark/light)
- Secciones por id para navegación con anclas
- `styles.css` contiene todos los estilos (sin CSS modules)
- React solo para componentes interactivos (cursor, fondo, theme toggler)
- Sin React Router (navegación con hash anchors)
