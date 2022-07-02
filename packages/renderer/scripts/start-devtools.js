// eslint-disable-next-line no-undef
const childProcess = require('child_process');
// eslint-disable-next-line no-undef
const process = require('process');

childProcess.fork('./node_modules/@vue/devtools/bin.js', {
  detached: true,
});

process.exit(0);
