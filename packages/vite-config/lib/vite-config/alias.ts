import { ViteBuildMode } from '../mode';

export type ViteBuiltinAlias = {
  __DEV__: boolean;
  __PROD__: boolean;
  __MODE__: ViteBuildMode;
};

const UnparsableType = ['function', 'object', 'symbol', 'bigint'];

export function toString(val: unknown): string {
  const type = typeof val;
  if (val === undefined || val === null) {
    return `${val}`;
  }
  if (UnparsableType.includes(type)) {
    throw new Error(`Cannot stringify type ${type}`);
  }
  return `${JSON.stringify(val)}`;
}

export function mapToViteDefine(alias: ViteBuiltinAlias) {
  return Object.entries(alias).reduce((define, [key, value]) => {
    define[`define.${key}`] = toString(value);
    return define;
  }, {} as Record<string, string>);
}
