import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ClientIpcInvokes, IpcInvokeParameters } from './ipc-invokes';
import { IpcEventToRenderer } from './ipc-events';
import { createLogger } from './logger';
function callMain<
  Channel extends keyof ClientIpcInvokes,
  Args extends IpcInvokeParameters<ClientIpcInvokes[Channel]>,
  Return extends ReturnType<ClientIpcInvokes[Channel]>
>(channel: Channel, ...args: [...Args]): Return {
  return ipcRenderer.invoke(channel, ...args) as Return;
}
function onMain<Channel extends keyof IpcEventToRenderer>(
  channel: Channel,
  listener: (event: IpcRendererEvent, ...args: IpcEventToRenderer[Channel]) => void
): void {
  ipcRenderer.on(channel, listener as (event: IpcRendererEvent, ...args: any[]) => void);
}

function onceMain<Channel extends keyof IpcEventToRenderer>(
  channel: Channel,
  listener: (event: IpcRendererEvent, ...args: IpcEventToRenderer[Channel]) => void
): void {
  ipcRenderer.once(channel, listener as (event: IpcRendererEvent, ...args: any[]) => void);
}

const exposeObject = {
  callMain: callMain,
  onMain: onMain,
  onceMain: onceMain,
  logger: createLogger('renderer'),
} as const;

Object.entries(exposeObject).forEach(([key, value]) => {
  contextBridge.exposeInMainWorld(key, value);
});

export type PreloadExpose = typeof exposeObject;
