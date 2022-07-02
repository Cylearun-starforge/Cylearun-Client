/// <reference types="vite/client" />
/// <reference types="config/env" />

import type { DefineComponent } from 'vue';
import type { PreloadExpose } from 'preload/src';

declare global {
  interface Window extends PreloadExpose {}

}

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export {};
