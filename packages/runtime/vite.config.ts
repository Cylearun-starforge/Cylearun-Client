import { withDefaultConfig } from '@cylearun/vite-config';
export default withDefaultConfig({
  root: __dirname,
  mode: 'dev',
  build: {
    lib: {
      entry: './lib/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
      external: [/node_modules/, 'electron'],
    },
  },
});
