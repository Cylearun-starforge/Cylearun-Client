import { app, Menu } from 'electron';
import { MainWindow } from './main-window';
import { join } from 'path';

const preload = join(__dirname, '../../../packages/preload/dist/index.cjs');

export class Application {
  static get raw() {
    return app;
  }

  private constructor() {
    throw new Error("Can't initialize static class");
  }

  static init() {
    Menu.setApplicationMenu(null);
    return app.whenReady().then(() => {
      Application.checkPlatform();

      import('electron-devtools-installer')
        .then(installer => {
          return installer.default(installer.VUEJS3_DEVTOOLS);
        })
        .catch(err => {
          console.error('An error occurred while installing Vue Devtools:', err);
        });
      const window = new MainWindow(preload);
      window.load();
      window.webContents.toggleDevTools();
      app.on('ready', () => {
        console.log('App is ready');
      });

      app.on('window-all-closed', () => {
        app.quit();
      });
    });
  }

  static checkPlatform() {
    if (process.platform !== 'win32') {
      // TODO: show a dialog
      console.warn('This application is not supported on this platform');
    }
  }
}
