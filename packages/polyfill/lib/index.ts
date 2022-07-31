import rcPath from './rc';
export type { Rc } from './rc';
export { default as RcPolyfill, type VitePostCssPlugin } from './rc/postcss-plugin';
export { rcPath };

globalThis.rc = rcPath;
