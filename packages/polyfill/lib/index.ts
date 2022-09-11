import rcPath from './rc';
export type { Rc } from './rc';
export { default as RcPolyfill, type VitePostCssPlugin } from './rc/postcss-plugin';
export { rcPath };
export { default as fsPath } from './fs';

globalThis.rc = rcPath;
