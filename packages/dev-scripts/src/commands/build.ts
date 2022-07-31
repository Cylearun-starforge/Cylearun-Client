import { execSync } from 'node:child_process';
import { moveToWorkspace } from '../env';
import { makeEmptyDir } from '../util/make-empty-dir';
import asar from 'asar';
import mv from 'mv';

export type BuildOptions = {
  pack: boolean;
};

const BUILD_TARGET = './app/shell';
const RESOURCES_TARGET = `${BUILD_TARGET}/resources`;

async function moveResources() {
  return new Promise<void>((resolve, reject) => {
    mv(
      './resources/dist/',
      RESOURCES_TARGET,
      {
        mkdirp: true,
        clobber: true,
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export default async function build(options: BuildOptions) {
  if (options.pack) {
    console.warn('--pack options is not supported yet');
  }
  moveToWorkspace();
  execSync('pnpm build', {
    stdio: 'inherit',
    cwd: './resources',
  });
  execSync('pnpm build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      MODE: 'prod',
    },
  });
  makeEmptyDir(BUILD_TARGET);

  const processes = ['client', 'renderer', 'preload'];
  return Promise.all([
    ...processes.map(async project => {
      const src = `./processes/${project}/dist`;
      const dest = `${BUILD_TARGET}/${project}.asar`;
      console.info('packing', src, 'to', dest);
      await asar.createPackage(src, dest);
    }),
    moveResources(),
  ]);
}
