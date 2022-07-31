import type { ViteBuiltinAlias } from './vite-config/alias';

declare global {
  declare const define: ViteBuiltinAlias;
}

export {};
