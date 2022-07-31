import { withDefaultConfig } from '@cylearun/vite-config';

export default withDefaultConfig({
  root: __dirname,
  build: {
    ssr: true,
    target: `chrome102`,
    assetsDir: '.',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
      external: [/node_modules/, 'electron'],
    },
  },
  plugins: [],
});
