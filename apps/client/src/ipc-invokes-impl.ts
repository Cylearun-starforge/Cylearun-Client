import { ClientIpcInvokes } from 'preload/src/ipc-invokes';
import { Application } from './application';
import { Paths } from './path';

export const IpcInvokeImpl: ClientIpcInvokes = {
  closeApp: async () => {
    Application.close();
  },
  loadMaps: async () => {
    await Application.mapLoader.whenReady();
    return Application.mapLoader.loadedMaps;
  },
  combinePath: async (_event, paths: string[]) => {
    return Paths.combine(paths as Array<Exclude<keyof typeof Paths, 'combine'>>);
  },
};
