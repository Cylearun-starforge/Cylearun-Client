import Controller, { type ControllerRoute, type ControllerContext } from '../controller';
import send from 'koa-send';

export default class DangerController extends Controller {
  RESOURCES_PREFIX = '/danger';
  async visitFs(context: ControllerContext) {
    const fsPath = context.path.slice(this.RESOURCES_PREFIX.length + 1);
    await send(context as any, fsPath);
  }

  getRoutes(): ControllerRoute[] {
    return [
      {
        method: 'GET',
        match: (path: string) => path.startsWith(this.RESOURCES_PREFIX),
        action: this.visitFs.bind(this),
      },
    ];
  }
}
