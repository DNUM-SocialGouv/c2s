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
  build: {
    rollupOptions: {
      external: [
        '@gouvfr/dsfr/dist/dsfr/dsfr.min.css',
        '@gouvfr/dsfr/dist/utility/colors/colors.min.css',
        '@gouvfr/dsfr/dist/utility/icons/icons.min.css',
      ],
    },
  },
});

