import { ClientIpcInvokes } from 'preload/src/ipc-invokes';
import { Application } from './application';

export const IpcInvokeImpl: ClientIpcInvokes = {
  closeApp: event => {
    Application.close();
  },
};
