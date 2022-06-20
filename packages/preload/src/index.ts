import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('preload', { preload: true });
