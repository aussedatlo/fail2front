import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    proxy:
      mode === 'development'
        ? {
            '/bans': {
              target: 'http://localhost:8000',
              changeOrigin: true,
            },
          }
        : undefined,
  },
}));
