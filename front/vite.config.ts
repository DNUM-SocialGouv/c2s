import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8081/',
      '/realms/': 'http://localhost:8080/realms/',
      '/admin/realms/': 'http://localhost:8080/admin/realms/',
      '/resources/': 'http://localhost:8080/resources/',
    },
  },
});
