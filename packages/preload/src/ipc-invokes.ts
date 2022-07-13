import { IpcMainInvokeEvent } from 'electron';
import { GameMap } from 'game/game-map';

type IpcInvoke<Args extends any[], Return> = (event: IpcMainInvokeEvent, ...args: [...Args]) => Promise<Return>;

export type IpcInvokeParameters<T> = T extends IpcInvoke<infer Args, any> ? (Args extends [] ? never : Args) : never;
/**
 * Defines an interface for an object that can be invoked by Electron.IpcRenderer.
 * Implemented at `client/src/ipc-invokes-impl.ts`.
 */
export type ClientIpcInvokes = {
  closeApp: IpcInvoke<[], void>;
  loadMaps: IpcInvoke<[], GameMap[]>;
};
