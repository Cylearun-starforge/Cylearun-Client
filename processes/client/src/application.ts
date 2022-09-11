import { app, Menu } from 'electron';
import { MainWindow } from './main-window';
import { join } from 'node:path';
import { getRuntime } from './runtime';
import { MapLoader } from './map/loader';
import { Paths } from './path';
import { createLogger } from './logger';

const preload = define.__DEV__
  ? join(__dirname, '../../preload/dist/index.cjs')
  : join(__dirname, '../preload.asar/index.cjs');

export class Application {
  private static _mainWindow: MainWindow;
  public static mapLoader: MapLoader;
  public static logger: ReturnType<typeof createLogger>;
  static get raw() {
    return app;
  }

  static registerIpcInvoke() {
    getRuntime();
  }

  private constructor() {
    throw new Error("Can't initialize static class");
  }

  static initLogger() {
    Application.logger = createLogger('main');
    Application.logger.transports.file.resolvePath = () => join(Paths.combine(['appPath', 'log']), 'client.log');
    Application.logger.transports.file.level = define.__DEV__ ? 'silly' : 'warn';
    console.log = Application.logger.log.bind(Application.logger);
    console.warn = Application.logger.warn.bind(Application.logger);
    console.error = Application.logger.error.bind(Application.logger);
    console.debug = Application.logger.debug.bind(Application.logger);
    console.info = Application.logger.info.bind(Application.logger);
  }

  static init() {
    Menu.setApplicationMenu(null);
    Application.mapLoader = new MapLoader();
    Application.mapLoader.loadMapsOnInit();
    Application.initLogger();
    return app.whenReady().then(async () => {
      Application.checkPlatform();
      Application.registerIpcInvoke();

      const window = new MainWindow(preload);
      Application._mainWindow = window;

      window.load();
      // if (define.__DEV__) {
      window.webContents.toggleDevTools();
      // }

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
