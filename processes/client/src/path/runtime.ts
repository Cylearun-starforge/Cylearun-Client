import { join } from 'node:path';
import { Application } from '../application';

export const RuntimePaths = {
  get appPath() {
    let value = '';
    if (value === '') {
      value = __BASE_REDIRECT__ ?? join(Application.raw.getAppPath(), '..');
    }
    return value;
  },
};

export type RuntimePathType = typeof RuntimePaths;
