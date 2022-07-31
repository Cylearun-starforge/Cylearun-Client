import { ipcRenderer } from 'electron';
import { ClientIpcInvokes } from './ipc-invokes';
import { MainProcessEmittable } from './ipc-events';

export class Runtime {
  public invokes: ClientIpcInvokes = {
    closeApp: () => ipcRenderer.invoke('closeApp'),
    loadMaps: () => ipcRenderer.invoke('loadMaps'),
    combinePath: (...paths: string[]) => ipcRenderer.invoke('combinePath', ...paths),
  };
  public emits: MainProcessEmittable = {
    onLoadSingleMap: callback => ipcRenderer.on('mapLoadSingle', (event, map) => callback(map)),
  };
}
