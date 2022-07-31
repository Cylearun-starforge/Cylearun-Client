/// <reference types="vite/client" />
/// <reference types="@cylearun/preload/env" />
/// <reference types="@cylearun/polyfill/env" />

import type { DefineComponent } from 'vue';

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    rc: typeof rc;
  }
}

export {};
