import { fork } from 'node:child_process';

fork('./node_modules/@vue/devtools/bin.js', {
  detached: true,
});

process.exit(0);
