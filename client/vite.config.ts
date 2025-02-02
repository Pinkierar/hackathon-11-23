import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: path.join(__dirname, 'docs'),
    rollupOptions: {
      input: {
        file1: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [react(), ViteMinifyPlugin({})],
  resolve: {
    alias: {
      '#global': path.resolve(__dirname, '../global'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#includes': path.resolve(__dirname, './src/includes'),
      '#store': path.resolve(__dirname, './src/store'),
      '#components': path.resolve(__dirname, './src/components'),
      '#config': path.resolve(__dirname, './src/config'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '@fonts': path.resolve(__dirname, './src/style/fonts'),
      '@style': path.resolve(__dirname, './src/style/style.scss'),
    },
    extensions: ['.ts', '.tsx'],
  },
});
