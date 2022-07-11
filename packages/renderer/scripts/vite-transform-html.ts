import { Plugin } from 'vite';

export default ({ port, production }: { port: number; production: boolean }): Plugin => {
  return {
    name: 'cy-client-devtool-transform-html',
    transformIndexHtml(html) {
      const contentSecurityPolicyString = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; script-src 'self' ${
        production ? 'file:' : "'unsafe-eval'"
      } https: http: fs: wss:; ${production ? '' : `connect-src http: ws:`} ">`;
      const devtoolScript = production ? '' : `<script src="http://localhost:${port}"></script>`;

      return html
        .replace('<vue-devtools-script />', devtoolScript)
        .replace('<vue-devtools-enable-eval />', contentSecurityPolicyString);
    },
  };
};
