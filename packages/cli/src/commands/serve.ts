import { Command } from 'commander';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '3001')
  .action((filename = 'adventOfCode.js', options) => {
    console.log(filename, options);
  });
