import { BrowserWindow } from 'electron';

export class MainWindow extends BrowserWindow {
  constructor(preload: string) {
    super({
      width: 1440,
      height: 990,
      maximizable: false,
      minHeight: 768,
      minWidth: 1280,
      maxHeight: 1080,
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
