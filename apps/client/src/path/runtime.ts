import { app } from 'electron';
import { join } from 'path';
import { Application } from '../application';

let inited = false;
app.whenReady().then(() => {
  inited = true;
});

export const RuntimePaths = {
  get appPath() {
    let value = '';
    if (inited && value === '') {
      value = __BASE_REDIRECT__ ?? join(Application.raw.getAppPath(), '..');
    }
    return value;
  },
};

export type RuntimePathType = typeof RuntimePaths;
