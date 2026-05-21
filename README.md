# Shirwal Connect

Futuristic hyperlocal multi-vendor platform for Shirwal, Maharashtra built fully as a static frontend app.

## Stack
React + Vite + TypeScript + TailwindCSS + Framer Motion + React Router + Zustand + Lucide React + Recharts.

## Run locally
```bash
npm install
npm run dev
```

## Production build check
```bash
npm run build
npm run preview
```

## GitHub Pages deployment (white-screen safe)
1. Set `homepage` in `package.json`:
   - `https://<your-username>.github.io/<repo-name>/`
2. Commit and push to your default branch.
3. Deploy:
```bash
npm install
npm run deploy
```
4. In GitHub repo settings:
   - **Pages → Source**: `Deploy from a branch`
   - Branch: `gh-pages`, folder: `/ (root)`

## Why this avoids blank screens
- Uses `HashRouter` so direct-route refreshes cannot 404 on GitHub Pages.
- Uses Vite `base` derived from `GITHUB_REPOSITORY` (or `./` fallback) so JS/CSS assets resolve correctly in repo subpaths.
- Uses `gh-pages -d dist` with `predeploy` build to publish the correct folder every time.

## Features
- Customer, vendor, and admin route suites.
- Premium dark glassmorphism UI.
- LocalStorage persistence via Zustand.
- Mock data and simulated realtime behavior.
- Charts, cards, notifications, favorites, cart, and tracking views.
