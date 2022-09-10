import KoaApplication from './application';

export type ControllerContext = KoaApplication['app']['context'];

export type ControllerRoute = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  match: (path: string) => boolean;
  action: (ctx: ControllerContext) => Promise<void>;
};

export default abstract class Controller {
  ctx: ControllerContext;

  constructor(app: KoaApplication) {
    this.ctx = app.app.context;
    app.controllers.push(this);
    this.getRoutes().forEach(route => {
      app.use(async (ctx, next) => {
        if (route.match(ctx.path)) {
          await route.action(ctx);
        } else {
          await next();
        }
      });
    });
  }

  abstract getRoutes(): ControllerRoute[];
}
