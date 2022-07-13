import { defineConfig } from 'vite';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PACKAGE_ROOT = __dirname;

const LOCAL_DEFINE = join(__dirname, './define.local.json');
const customDefine =
  process.env.MODE === 'production'
    ? {}
    : existsSync(LOCAL_DEFINE)
    ? JSON.parse(readFileSync(LOCAL_DEFINE).toString())
    : {};

export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: 'esnext',
    outDir: 'dist',
    assetsDir: './assets',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
    emptyOutDir: true,
    reportCompressedSize: true,
  },
  define: {
    __DEV__: process.env.MODE !== 'production',
    __BUILD__: process.env.MODE !== 'development',
    ...customDefine,
  },
});
