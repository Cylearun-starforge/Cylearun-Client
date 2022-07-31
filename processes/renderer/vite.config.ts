import autoprefixer from 'autoprefixer';
import { join } from 'path';
import VuePlugin from '@vitejs/plugin-vue';
import VueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { withDefaultConfig, Plugin } from '@cylearun/vite-config';
import { RcPolyfill, type VitePostCssPlugin } from '@cylearun/polyfill';

const PACKAGE_ROOT = __dirname;

export default withDefaultConfig({
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
    proxy: {
      '/@rc/': {
        target: 'http://127.0.0.1:11451',
        rewrite: path => path.replace(/^\/@rc\//, '/resources/'),
      },
    },
  },
  build: {
    target: `chrome102`,
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
  },
  plugins: [VuePlugin(), VueJsxPlugin(), process.env.MODE === 'dev' && Plugin.VueDevtoolsPlugin(8098)],
  test: {
    environment: 'jsdom',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          env: 'chrome102',
        }) as VitePostCssPlugin,
        RcPolyfill,
      ],
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
