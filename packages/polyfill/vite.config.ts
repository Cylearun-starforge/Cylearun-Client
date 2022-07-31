import { withDefaultConfig } from '@cylearun/vite-config';

export default withDefaultConfig({
  appType: 'custom',
  build: {
    sourcemap: false,
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
    rollupOptions: {
      external: [/node_modules/],
    },
  },
});
