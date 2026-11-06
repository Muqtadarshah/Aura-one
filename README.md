# AURA One — React + Three.js product website

## Run it
```bash
npm install
npm run dev      # development server
npm run build    # production build in /dist
```

## Structure
- `src/data.js` — models, prices (PKR), colors, 3D camera keyframes. Edit this to change content.
- `src/components/Scene.jsx` — the Three.js headphones, scroll-driven camera and color.
- `src/components/Sections.jsx` — all page sections.
- `src/components/OrderDialog.jsx` — order form (demo, no backend).
- `src/styles.css` — all styling (dark/light aware).
