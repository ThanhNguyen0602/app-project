import { spawn } from 'node:child_process';

const isWin = process.platform === 'win32';
const npm = isWin ? 'npm.cmd' : 'npm';

const run = (workspace) =>
  spawn(npm, ['run', 'dev', '--workspace', workspace], {
    stdio: 'inherit',
    shell: isWin,
  });

const children = [run('back-end'), run('front-end')];

const stop = () => children.forEach((c) => c.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
children.forEach((c) => c.on('exit', stop));
