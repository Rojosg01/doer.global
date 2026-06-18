import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH ? (process.env.VITE_BASE_PATH.endsWith('/') ? process.env.VITE_BASE_PATH : `${process.env.VITE_BASE_PATH}/`) : '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
  },
  server: {
    port: 5173,
    open: true,
  },
});
