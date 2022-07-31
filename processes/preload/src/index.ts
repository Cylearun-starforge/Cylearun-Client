import { contextBridge } from 'electron';
import { Runtime } from '@cylearun/runtime';

// const logger = createLogger('renderer');
// const exposeObject = {
//   callMain: callMain,
//   onMain: onMain,
//   onceMain: onceMain,
//   logger,
// };

// callMain('combinePath', ['appPath', 'log']).then(path => {
//   logger.transports.file.resolvePath = () => join(path, 'renderer.log');
//   Object.entries(exposeObject).forEach(([key, value]) => {
//     contextBridge.exposeInMainWorld(key, value);
//   });
// });

contextBridge.exposeInMainWorld('runtime', new Runtime());
// contextBridge.exposeInMainWorld('logger', createLogger('renderer'));
