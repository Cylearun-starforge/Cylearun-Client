import glob from 'glob';
import asar from 'asar';

export type PackOptions = {
  root: string;
  outputDir: string;
};

const FilterDirs = ['package.json', 'dist'];

export default async function pack(options: PackOptions) {
  console.log('pack options', options);
  const { root, outputDir } = options;
  const files = glob.sync('*', { cwd: root });
  const FilterWithOutDirs = [...FilterDirs, outputDir];
  const entries = files.filter(file => !FilterWithOutDirs.includes(file));
  return await entries.map(entry => {
    console.info('start packing', entry);
    asar.createPackage(entry, `${outputDir}/${entry}.asar`);
  });
}
