import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '#global': path.resolve(__dirname, '../global'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#includes': path.resolve(__dirname, './src/includes'),
      '#store': path.resolve(__dirname, './src/store'),
      '#components': path.resolve(__dirname, './src/components'),
      '#config': path.resolve(__dirname, './src/config'),
    },
  },
});
