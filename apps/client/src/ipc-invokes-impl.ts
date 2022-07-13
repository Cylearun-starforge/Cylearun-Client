import { ClientIpcInvokes } from 'preload/src/ipc-invokes';
import { Application } from './application';

export const IpcInvokeImpl: ClientIpcInvokes = {
  closeApp: async event => {
    Application.close();
  },
  loadMaps: async event => {
    await Application.mapLoader.whenReady();
    return Application.mapLoader.loadedMaps;
  },
};
