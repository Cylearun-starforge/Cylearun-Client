import { join } from 'path';
import { ClientIpcInvokes } from 'preload/src/ipc-invokes';
import { Application } from './application';

export const IpcInvokeImpl: ClientIpcInvokes = {
  closeApp: async () => {
    Application.close();
  },
  loadMaps: async () => {
    await Application.mapLoader.whenReady();
    return Application.mapLoader.loadedMaps;
  },
  appPath: async () => {
    return join(Application.raw.getAppPath(), '..');
  },
};
