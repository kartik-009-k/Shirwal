# Shirwal Connect

Futuristic hyperlocal multi-vendor platform for Shirwal, Maharashtra built fully as a static frontend app.

## Stack
React + Vite + TypeScript + TailwindCSS + Framer Motion + React Router + Zustand + Lucide React + Recharts.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages deployment
1. Update `homepage` in `package.json` to your GitHub username.
2. Ensure `vite.config.ts` base is `/Shirwal/` (or your repo name).
3. Push to GitHub.
4. Run:
```bash
npm run deploy
```
5. In GitHub repository settings, set Pages source to `gh-pages` branch.

## Features
- Customer, vendor, and admin route suites.
- Premium dark glassmorphism UI.
- LocalStorage persistence via Zustand.
- Mock data and simulated realtime behavior.
- Charts, cards, notifications, favorites, cart, and tracking views.
