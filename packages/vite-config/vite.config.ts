import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: __dirname,
  appType: 'custom',
  build: {
    sourcemap: 'inline',
    lib: {
      entry: 'lib/index.ts',
      formats: ['es', 'cjs'],
      fileName(format) {
        if (format === 'cjs') {
          return 'cjs/index.js';
        }
        return 'esm/index.js';
      },
    },
    outDir: 'dist',
    minify: false,
    emptyOutDir: true,
    reportCompressedSize: true,
    rollupOptions: {
      external: [/node:/, /node_modules/, 'vite', 'vitest', 'chalk'],
    },
  },
});
