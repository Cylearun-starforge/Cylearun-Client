import { app, Menu, ipcMain } from 'electron';
import { MainWindow } from './main-window';
import { join } from 'path';
import { IpcInvokeImpl } from './ipc-invokes-impl';
import { MapLoader } from './map/loader';
import { createLogger } from 'preload/src/logger';

const preload = __BUILD__
  ? join(__dirname, './preload/index.cjs')
  : join(__dirname, '../../../packages/preload/dist/index.cjs');

export class Application {
  private static _mainWindow: MainWindow;
  public static mapLoader: MapLoader;
  public static logger: ReturnType<typeof createLogger>;
  static get raw() {
    return app;
  }

  static registerIpcInvoke() {
    Object.entries(IpcInvokeImpl).forEach(([channel, handler]) => {
      ipcMain.handle(channel, handler);
    });
  }

  private constructor() {
    throw new Error("Can't initialize static class");
  }

  static init() {
    Menu.setApplicationMenu(null);
    Application.mapLoader = new MapLoader();
    Application.mapLoader.loadMapsOnInit();
    return app.whenReady().then(async () => {
      this.logger = createLogger('main');
      Application.checkPlatform();
      Application.registerIpcInvoke();

      const window = new MainWindow(preload);
      Application._mainWindow = window;

      window.load();
      if (__DEV__) {
        window.webContents.toggleDevTools();
      }

      app.on('ready', () => {
        console.log('App is ready');
      });

      app.on('window-all-closed', () => {
        Application.close();
      });
    });
  }

  static checkPlatform() {
    if (process.platform !== 'win32') {
      // TODO: show a dialog
      console.warn('This application is not supported on this platform');
    }
  }

  static close() {
    app.quit();
  }
}
