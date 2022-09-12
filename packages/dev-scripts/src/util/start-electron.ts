import { spawn, SpawnOptions } from 'node:child_process';
import electron from 'electron';

export type Options = {
  debug?: {
    port: number;
    stopAtEntry: boolean;
  };
};

function getArgsFromOptions(options: Options) {
  const args = [];
  if (options.debug) {
    const debugCommand = options.debug.stopAtEntry ? '--inspect-brk' : '--inspect';
    args.push(`${debugCommand}=${options.debug.port}`);
  }
  return args;
}

export function startElectron(options: Options, electronArgs: string[], spawnOptions: SpawnOptions) {
  const optionArgs = getArgsFromOptions(options);

  const args = [...optionArgs, ...electronArgs];

  const child = spawn(electron as unknown as string, args, spawnOptions);
  child.on('close', function (code, signal) {
    if (code === null) {
      console.error(electron, 'exited with signal', signal);
      process.exit(1);
    }
    process.exit(code);
  });

  const handleTerminationSignal = function (signal: 'SIGINT' | 'SIGTERM') {
    process.on(signal, function signalHandler() {
      if (!child.killed) {
        child.kill(signal);
      }
    });
  };

  handleTerminationSignal('SIGINT');
  handleTerminationSignal('SIGTERM');
}
