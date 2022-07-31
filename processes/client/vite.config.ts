import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { withDefaultConfig } from '@cylearun/vite-config';

const PACKAGE_ROOT = __dirname;

const LOCAL_DEFINE = join(__dirname, './define.local.json');
const customDefine =
  process.env.MODE === 'production'
    ? {}
    : existsSync(LOCAL_DEFINE)
    ? JSON.parse(readFileSync(LOCAL_DEFINE).toString())
    : {};

export default withDefaultConfig({
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
      external: ['electron', '@cylearun/preload', 'electron-log'],
    },
  },
  define: {
    ...customDefine,
  },
});
