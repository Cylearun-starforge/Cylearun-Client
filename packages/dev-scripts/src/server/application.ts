import Koa from 'koa';

export default class KoaApplication {
  constructor() {
    this.app = new Koa();
    this.app.on('error', err => {
      console.error(err);
    });
  }
  app: Koa;
  use(middleware: Koa.Middleware) {
    this.app.use(middleware);
  }
  listen(port: number) {
    this.app.listen(port);
  }
}
