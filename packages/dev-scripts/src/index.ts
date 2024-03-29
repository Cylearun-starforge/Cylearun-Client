import { Command } from 'commander';
import pack from './commands/pack';
import build from './commands/build';
import dev from './commands/dev';
import electron from './commands/electron';
import serve from './commands/serve';
import chalk from 'chalk';

const parser = new Command();
parser
  .command('build')
  .description('Build Cylearun Client')
  .option('--pack', 'Pack client into a exe file', false)
  .option('-pre --pre-release', 'Build pre-release version', false)
  .action(async options => {
    await build(options);
  });

parser
  .command('dev')
  .description('Run Cylearun Client in development mode')
  .option('-d, --dev-tools', 'Additionally opens a Vue Devtools', false)
  .option('-p, --port <port>', 'Debug port, proxy to electron')
  .option('-b, --break', 'Break on start, proxy to electron', false)
  .addHelpText('after', ['', dev.hints.description, dev.hints.difference].join('\n'))
  .action(async options => {
    await dev(options);
  });

parser
  .command('pack')
  .description('Pack asar')
  .requiredOption('-r --root <root>', 'Root path of asar')
  .requiredOption('-dir --output-dir <dir>', 'Glob style filter for files to exclude')
  .action(async options => {
    await pack(options);
  });

parser.command('serve').description('Start a dev-server to serve static files').action(serve);

parser
  .command('electron')
  .description('Start electron')
  .option('-p, --port <port>', 'Debug port')
  .option('-b, --break', 'Break on start', false)
  .requiredOption('-s, --script <script>', 'Electron script')
  .option('-a, --args <args...>', 'Electron script args', [])
  .action(electron);

parser.addHelpText(
  'afterAll',
  chalk.bgCyanBright('\n 设计文档: https://star-forge.feishu.cn/wiki/wikcnvkH24c41KOIbgZGCBD5hge \n')
);

parser.parse();
