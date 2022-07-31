/**
 * @type {import('./vue-devtools-plugin').CspType}
 */
const DEV_CSP = {
  'default-src': ["'self'", 'unsafe-inline'],
  'script-src': ["'self'", 'unsafe-eval', 'https:', 'http:', 'fs:', 'wss:'],
};

/**
 * @type {import('./vue-devtools-plugin').CspType}
 */
const PROD_CSP = {
  'default-src': ["'self'", 'unsafe-inline'],
  'script-src': ["'self'", 'file:', 'https:', 'http:', 'fs:', 'wss:'],
  'connect-src': ['http:', 'ws:'],
};

/**
 *
 * @param {import('./vue-devtools-plugin').CspType} csp
 * @returns {string}
 */
export function formatContentSecurityPolicyContent(csp) {
  return Object.entries(csp)
    .map(([key, value]) => {
      return `${key} ${value.join(' ')}`;
    })
    .join('; ');
}

/**
 * @param {{mode: import('./type').ViteBuildMode; port: number}} param
 * @return {import('vite').Plugin}
 */
export default param => {
  const { port, mode } = param;
  return {
    name: 'vue-devtools-plugin',
    transformIndexHtml() {
      const cspContent = formatContentSecurityPolicyContent(mode === 'dev' ? DEV_CSP : PROD_CSP);
      /**
       * @type {import('vite').HtmlTagDescriptor[]}
       */
      const tags = [
        {
          tag: 'meta',
          attrs: {
            'http-equiv': 'Content-Security-Policy',
            content: cspContent,
          },
          injectTo: 'head',
        },
      ];
      if (mode === 'dev') {
        tags.push({
          tag: 'script',
          attrs: {
            src: `http://localhost:${port}`,
          },
          injectTo: 'body-prepend',
        });
      }
      return tags;
    },
  };
};
