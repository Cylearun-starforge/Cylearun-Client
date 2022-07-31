import koa from 'koa';
import chalk from 'chalk';
import { moveToWorkspace } from '../env';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import send from 'koa-send';
import { fork } from 'node:child_process';

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

const RESOURCES_PREFIX = '/resources';

export function start() {
  const server = new koa();
  server.listen(ServerConfig.port, ServerConfig.address);
  console.log(serve.hints.serving);
  server.on('connection', () => {
    console.log(serve.hints.serving);
  });
  console.log(serve.hints.serving);

  server.use(async (context, next) => {
    const isResources = context.path.startsWith(RESOURCES_PREFIX);
    if (!isResources) {
      context.status = 404;
    } else {
      const rcPath = join('./', context.path.slice(RESOURCES_PREFIX.length));
      console.log('finding', rcPath);
      await send(context, rcPath, { root: './resources' });
    }
  });

  server.on('error', err => {
    console.error(err);
  });
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
