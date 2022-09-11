import Controller, { type ControllerRoute, type ControllerContext } from '../controller';
import { join } from 'node:path';
import send from 'koa-send';

export default class ResourcesController extends Controller {
  RESOURCES_PREFIX = '/resources';
  async gerResources(context: ControllerContext) {
    const rcPath = join('./', context.path.slice(this.RESOURCES_PREFIX.length));
    console.log('finding', rcPath);
    await send(context as any, rcPath, { root: './resources' });
  }

  getRoutes(): ControllerRoute[] {
    return [
      {
        method: 'GET',
        match: (path: string) => path.startsWith(this.RESOURCES_PREFIX),
        action: this.gerResources.bind(this),
      },
    ];
  }
}
