import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true
  },
  base: './',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        sourcemap: false,
        manualChunks: {
          'react': ['react', 'react-dom', 'react-router-dom'],
          'phaser': ['phaser'],
          'framer-motion': ['framer-motion'],
        },
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
