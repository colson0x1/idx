import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '3001')
  .action(async (filename = 'adventOfCode.js', options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      /* 
      process.cwd() - returns directory (absolute path) the user ran that command from, 
      path.dirname()  - returns folder name of the relative path provided,
      basename() - returns just the filename
    */
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`,
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'EADDRINUSE') {
          console.log('Port is in use. Try running on a different port.');
        } else if (err instanceof Error) {
          console.log('Heres the problem', err.message);
        }
        process.exit(1);
      }
    }
  });
