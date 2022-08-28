import KoaApplication from './application';
import ResourcesController from './routes/resources';

const app = new KoaApplication();
new ResourcesController(app);

export default app;
