import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '3001')
  .action((filename = 'adventOfCode.js', options: { port: string }) => {
    /* 
      process.cwd() - returns directory (absolute path) the user ran that command from, 
      path.dirname()  - returns folder name of the relative path provided,
      basename() - returns just the filename
    */
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
  });
