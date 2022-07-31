import { UserConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import { isDevelopmentMode, isProductionMode, ViteBuildMode, VITE_BUILD_MODES } from '../mode';
import { mapToViteDefine } from './alias';
import chalk from 'chalk';
import { constants } from 'node:os';

const merge: (defaults: UserConfig, overrides: UserConfig, isRoot?: boolean) => UserConfig = mergeConfig;

export type ViteConfig = UserConfig & {
  mode?: ViteBuildMode;
};

function isModeEnv(env: string = ''): env is ViteBuildMode {
  return VITE_BUILD_MODES.includes(env as ViteBuildMode);
}

/**
 * Set some vite config.
 *
 * This function merges the following configs with param config:
 * ```
 * {
 *   define: ViteBuiltinAlias,
 *   build: {
 *     emptyOutDir: true,
 *     reportCompressedSize: true,
 *     target: 'esnext',
 *     minify: config.mode is prod mode,
 *     outDir: 'dist',
 *     sourcemap: 'inline' if config.mode is dev mode else false,
 *     rollupOptions: {
 *      external: [/node:/],
 *     },
 *   },
 *   mode: process.env.MODE
 * }
 * ```
 * @param config - vite config
 * @returns merged vite config
 */
export function withDefault(config: ViteConfig): UserConfig {
  const mode = config.mode ?? process.env.MODE;
  if (!isModeEnv(mode)) {
    console.error(chalk.red('Expect build mode'));
    console.error('Valid modes:', chalk.blue(`[${VITE_BUILD_MODES.join(', ')}]`));
    process.exit(constants.errno.EINVAL);
  }

  const isDev = isDevelopmentMode(mode);
  const isProd = isProductionMode(mode);
  return merge(
    {
      define: mapToViteDefine({
        __DEV__: isDev,
        __MODE__: mode,
        __PROD__: isProd,
      }),
      mode,
      build: {
        emptyOutDir: true,
        reportCompressedSize: true,
        target: 'esnext',
        minify: isProd,
        outDir: 'dist',
        sourcemap: isDev ? 'inline' : false,
        rollupOptions: {
          external: [/node:/],
        },
      },
    },
    config
  );
}
