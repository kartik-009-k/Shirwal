import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages safe default:
// - Uses a repository subpath when REPO_NAME is provided
// - Falls back to relative assets (./) so previews and forks still work
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  plugins: [react()],
  base: repo ? `/${repo}/` : './',
  build: {
    sourcemap: true,
  },
});
