import { defineConfig } from 'vite';

// Minimal Vite config — uses project root and `public/` for static assets
export default defineConfig({
  root: '.',
  publicDir: 'public'
});
