import Koa from 'koa';
import Controller from './controller';

export default class KoaApplication {
  public controllers: Controller[] = [];
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
