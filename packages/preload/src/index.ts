import { contextBridge, ipcRenderer } from 'electron';
import { ClientIpcInvokes, IpcInvokeParameters } from './ipc-invokes';

function callMain<
  Channel extends keyof ClientIpcInvokes,
  Args extends IpcInvokeParameters<ClientIpcInvokes[Channel]>,
  Return extends ReturnType<ClientIpcInvokes[Channel]>
>(channel: Channel, ...args: [...Args]): Return {
  return ipcRenderer.invoke(channel, ...args) as Return;
}

const exposeObject = {
  callMain: callMain,
} as const;

Object.entries(exposeObject).forEach(([key, value]) => {
  contextBridge.exposeInMainWorld(key, value);
});

export type PreloadExpose = typeof exposeObject;
