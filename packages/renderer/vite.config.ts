import autoprefixer from 'autoprefixer';
import { join } from 'path';
import { defineConfig, ViteBuildMode } from 'vite';
import VuePlugin from 'vite/lib/vue-plugin';
import VueDevtoolsPlugin from 'vite/lib/vue-devtools-plugin';
import VueJsxPlugin from 'vite/lib/vue-jsx-plugin';
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
    __BUILD__: process.env.MODE !== 'development',
  },
  plugins: [VuePlugin(), VueJsxPlugin(), VueDevtoolsPlugin({ port: 8098, mode: process.env.MODE as ViteBuildMode })],
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
