export * as Mode from './mode';
import VueDevtoolsPlugin from './vue-devtools-plugin';
import { withDefault } from './vite-config';
export const Plugin = { VueDevtoolsPlugin };
export const withDefaultConfig = withDefault;
