import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean,
) => {
  const app = express();

  /*
   * @ The code below is configured to work on production environment :)
   * I've written, Two different ways of serving react assets -
   * : One is intended when user has installed CLI on to their local machine
   * : The other is intended for whenever we're running our application
   * in this kind of development mode and we've got an actual CRA server running
   *
   * require.resolve() doesn't attempt to load up a file instead, it's
   * going to apply node's path resolution algorithm to figure out the
   * directory or essentially the file location of that index.html file.
   *
   * packagePath right here is gonna be the absolute path on your machine
   * to get to that index.html file.
   *
   * path.dirname() gives everything up to that build folder.
   * express.static() is specifically going to serve that build folder.
   *
   * As soon as the user installs all the stuff on their local machine,
   * require.resolve() is going to find the local-client build directory
   * directly inside of our node_modules folder instead rather than giving us
   * the local-client folder that's inside of packages.
   *
   * We only see local-client in packages with this line packagePath,
   * when we're running our code in this sort of development environment
   */

  if (useProxy) {
    // @ Redirect/Proxy the request over to running React Development Server
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        // Enable websockets support
        // Note: CRA by default uses websockets to tell the browser whenever some development file is changed
        ws: true,
        logLevel: 'silent',
      }),
    );
  } else {
    // @ Serve production build files directly from local-client package
    const packagePath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
