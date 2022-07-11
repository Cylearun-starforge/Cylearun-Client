import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoprefixer from 'autoprefixer';
import { join } from 'path';
import DevtoolsTransformPlugin from './scripts/vite-transform-html';

const PACKAGE_ROOT = __dirname;

export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  base: '',
  server: {
    fs: {
      strict: true,
    },
    port: 3000,
  },
  build: {
    sourcemap: true,
    target: `chrome102`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: true,
  },
  define: {
    __DEV__: process.env.MODE !== 'production',
  },
  plugins: [vue(), vueJsx(), DevtoolsTransformPlugin({ port: 8098, production: process.env.MODE === 'production' })],
  test: {
    environment: 'jsdom',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          env: 'chrome102',
        }),
      ],
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
