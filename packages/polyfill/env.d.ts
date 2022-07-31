/// <reference types="@cylearun/vite-config/lib/env" />
declare global {
  /**
   * `rcPath` 的别名
   *
   * `var` makes life easier :)
   * @see https://stackoverflow.com/a/69429093/14769120
   */
  declare var rc: typeof import('./lib').rcPath;
}

export {};
