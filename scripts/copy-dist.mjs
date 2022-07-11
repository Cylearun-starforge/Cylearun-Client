import { copy, remove } from 'fs-extra';

const rendererDist = './packages/renderer/dist/';
const preloadDist = './packages/preload/dist/';
const targetDir = './apps/built/code/';
const clientDist = './apps/client/dist/';

const copyDir = async (src, dest) => {
  try {
    await remove(dest);
  } catch (e) {
  } finally {
    await copy(src, dest, { overwrite: true });
  }
};

await copyDir(clientDist, targetDir);
await Promise.all([copyDir(rendererDist, targetDir + '/renderer'), copyDir(preloadDist, targetDir + '/preload')]);
