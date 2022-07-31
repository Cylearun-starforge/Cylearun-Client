import { StaticPathType, StaticPaths } from './static';
import { RuntimePathType, RuntimePaths } from './runtime';
import { join } from 'node:path';

type PathType = keyof (StaticPathType & RuntimePathType);

export const Paths = {
  ...StaticPaths,
  ...RuntimePaths,
  combine(keys: PathType[]) {
    return keys.slice(1).reduce((path, key) => {
      return join(path, Paths[key]) as string;
    }, this[keys[0]]);
  },
};
