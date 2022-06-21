import { BrowserWindow } from 'electron';

export class MainWindow extends BrowserWindow {
  constructor(preload: string) {
    super({
      width: 1920,
      height: 1080,
      maximizable: false,
      minHeight: 1080,
      maxWidth: 1920,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload,
      },
    });
  }

  load() {
    this.loadURL('http://127.0.0.1:3000');
  }
}
