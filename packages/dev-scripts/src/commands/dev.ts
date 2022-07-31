import chalk from 'chalk';
import { moveToWorkspace } from '../env';
import { execSync, exec } from 'node:child_process';
import { startWithFork } from './serve';

export type DevOptions = {
  devTools: boolean;
};

function startDevtools() {
  const controller = new AbortController();
  exec('pnpm exec vue-devtools', {
    signal: controller.signal,
  });
}

export default function dev(options: DevOptions) {
  moveToWorkspace();
  console.log(dev.hints.difference);
  if (options.devTools) {
    startDevtools();
  }
  startWithFork();
  execSync('pnpm dev', {
    stdio: 'inherit',
    env: {
      ...process.env,
      MODE: 'dev',
    },
  });
}

dev.hints = {
  difference: chalk.redBright(
    '生产模式打包产物和开发模式可能存在行为差异。请在正式提交代码前使构建预览版客户端, 确保行为一致。关于生产模式，参考 build 指令。关于行为差异, 参考 dev-scripts 文档中的“行为差异”部分。'
  ),
  description: chalk.blueBright('cylearun dev: 以开发模式启动客户端，渲染进程获得热重载能力。'),
};
