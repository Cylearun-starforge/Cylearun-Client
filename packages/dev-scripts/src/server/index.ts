import KoaApplication from './application';
import ResourcesController from './routes/resources';
import DangerController from './routes/danger';
const app = new KoaApplication();
new ResourcesController(app);
new DangerController(app);
export default app;
