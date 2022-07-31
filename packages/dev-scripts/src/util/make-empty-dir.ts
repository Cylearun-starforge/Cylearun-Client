import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import { existsSync } from 'node:fs';

export function makeEmptyDir(dir: string) {
  if (existsSync(dir)) {
    rimraf.sync(dir);
  } else {
    mkdirp.sync(dir);
  }
}
