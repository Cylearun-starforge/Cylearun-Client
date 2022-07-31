import { Plugin } from 'vite';

type Source = string[];

export type CspType = {
  'default-src'?: Source;
  'script-src'?: Source;
  'connect-src'?: Source;
  'style-src'?: Source;
  'img-src'?: Source;
  'media-src'?: Source;
};

const DEV_CSP: CspType = {
  'default-src': ["'self'", 'unsafe-inline'],
  'script-src': ["'self'", 'unsafe-eval', 'https:', 'http:', 'fs:', 'wss:'],
};

// const PROD_CSP: CspType = {
//   'default-src': ["'self'", 'unsafe-inline'],
//   'script-src': ["'self'", 'file:', 'https:', 'http:', 'fs:', 'wss:'],
//   'connect-src': ['http:', 'ws:'],
// };

export function formatContentSecurityPolicyContent(csp: CspType) {
  return Object.entries(csp)
    .map(([key, value]) => {
      return `${key} ${value.join(' ')}`;
    })
    .join('; ');
}

export default (port: number): Plugin => {
  return {
    name: 'vue-devtools-plugin',
    transformIndexHtml() {
      const cspContent = formatContentSecurityPolicyContent(DEV_CSP);

      return [
        {
          tag: 'script',
          attrs: {
            src: `http://localhost:${port}`,
          },
          injectTo: 'body-prepend',
        },
      ];
    },
  };
};
