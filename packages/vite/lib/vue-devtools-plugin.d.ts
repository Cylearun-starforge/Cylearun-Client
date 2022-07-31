import { Plugin } from 'vite';
import { ViteBuildMode } from './type';

type Source = string[];

export type CspType = {
  'default-src'?: Source;
  'script-src'?: Source;
  'connect-src'?: Source;
  'style-src'?: Source;
  'img-src'?: Source;
  'media-src'?: Source;
};

export function formatContentSecurityPolicyContent(csp: CspType): string;

declare function VueDevtoolsPlugin({ port, mode }: { port: number; mode: ViteBuildMode }): Plugin;
export default VueDevtoolsPlugin;
