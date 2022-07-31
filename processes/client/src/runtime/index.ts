import { Application } from '../application';
import { Paths } from '../path';
import { IRuntimeProvider } from '@cylearun/runtime';
import { ipcMain } from 'electron';

export class Runtime {
  private static _instance: Runtime;
  public static getInstance(): Runtime {
    if (!Runtime._instance) {
      Runtime._instance = new Runtime();
    }
    return Runtime._instance;
  }

  private readonly provide: IRuntimeProvider = {
    invokeHandlers: {
      closeApp: async () => {
        Application.close();
      },
      combinePath: async (_event, ...paths) => {
        return Paths.combine(paths as Array<Exclude<keyof typeof Paths, 'combine'>>);
      },
      loadMaps: async () => {
        await Application.mapLoader.whenReady();
        return Application.mapLoader.loadedMaps;
      },
    },
    emits: {
      onLoadSingleMap: callback => {
        // TODO: implement
      },
    },
  };

  private constructor() {
    Object.entries(this.provide.invokeHandlers).forEach(([channel, handler]) => {
      ipcMain.handle(channel, handler);
    });
  }
}

export const getRuntime = Runtime.getInstance;
