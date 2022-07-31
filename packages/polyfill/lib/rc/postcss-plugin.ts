/**
 * @file 为 CSS 提供资源路径 Polyfill 的 PostCSS 插件
 *
 * usage:
 * ```css
 * @rc --css-variable: '<folder>', '<path>'
 * background-image: var(--css-variable);
 * ```
 */

import rcPath from '.';
import type { CSSOptions } from 'vite';

/**
 * 与 Vite Config 兼容的 PostCSS 插件类型
 *
 * P.S. 我也不知道为什么，vite 选项里面的 PostCSS 插件类型和 postcss 插件类型不一致
 */
export type VitePostCssPlugin = Exclude<
  Exclude<CSSOptions['postcss'], string | undefined>['plugins'],
  undefined
>[number];

const stripQuotes = (str: string) => {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }
  if (str.startsWith("'") && str.endsWith("'")) {
    return str.slice(1, -1);
  }
  return str;
};

const plugin: VitePostCssPlugin = {
  postcssPlugin: '@cylearun/polyfill-rc',

  AtRule(atRule, help) {
    if (atRule.name !== 'rc') {
      return;
    }
    const [cssVar, rcPair] = atRule.params.split(':').map(s => s.trim());
    const [folder, path] = rcPair
      .split(',')
      .map(s => s.trim())
      .map(stripQuotes);
    const decl = new help.Declaration({
      prop: cssVar,
      value: `url('${rcPath(folder, path)}')`,
    });
    atRule.replaceWith(decl);
  },
};

export default plugin;
