import { withDefaultConfig } from '@cylearun/vite-config';

export default withDefaultConfig({
  mode: 'dev',
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'cylearun',
    },
    outDir: 'bin',
    assetsDir: '.',
    rollupOptions: {
      external: [/node_modules/, /node:/],
    },
  },
});
