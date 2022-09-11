import koa from 'koa';
import chalk from 'chalk';
import { moveToWorkspace } from '../env';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import send from 'koa-send';
import { fork } from 'node:child_process';
import devServer from '../server';

export const ServerConfig = {
  port: 11451,
  address: '127.0.0.1',
};

export function serveFile(path: string) {
  if (!existsSync(path)) {
    return {
      code: 404,
      body: 'Not Found',
    };
  }

  return {
    code: 200,
    body: readFile(path, 'utf8'),
  };
}

export function start() {
  devServer.app.listen(ServerConfig.port, ServerConfig.address);
  console.log(serve.hints.serving);
}

export default function serve() {
  moveToWorkspace();
  start();
}

serve.hints = {
  serving: chalk.green(`启动服务器, 监听地址: http://${ServerConfig.address}:${ServerConfig.port}`),
};

export function startWithFork() {
  const devServerController = new AbortController();
  console.log('starting dev-server');
  process.on('SIGKILL', () => {
    devServerController.abort();
  });
  moveToWorkspace();
  fork('./packages/dev-scripts/bin/cylearun', ['serve'], {
    stdio: 'inherit',
    signal: devServerController.signal,
  });
}
