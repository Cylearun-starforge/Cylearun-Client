import { startElectron, type Options } from '../util/start-electron';

export type ElectronOptions = {
  port?: string;
  break: boolean;
  script: string;
  args: string[];
};

function getStartupOptions(options: ElectronOptions) {
  const debugPort = parseInt(process.env.ELECTRON_DEBUG_PORT ?? options.port!, 10);
  const stopAtEntry = ['true', '1'].includes(process.env.ELECTRON_DEBUG_STOP_AT_ENTRY!) || options.break;
  const hasDebugPort = Number.isNaN(debugPort) === false;
  const startupOptions: Options = {
    debug: hasDebugPort ? { port: debugPort, stopAtEntry } : undefined,
  };
  return startupOptions;
}

export default function electron(options: ElectronOptions) {
  const electronOptions = getStartupOptions(options);
  startElectron(electronOptions, [options.script, ...options.args], {
    stdio: 'inherit',
    env: {
      ...process.env,
      MODE: 'dev',
    },
  });
}
