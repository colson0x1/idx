import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  app.use(express.static('../../local-client/build'));

  /*
  app.use(
    createProxyMiddleware({
      target: 'http://localhost:3000',
      // Enable websockets support
      // Note: CRA by default uses websockets to tell the browser wheneven some development file is changed
      ws: true,
      logLevel: 'silent',
    }),
  );
  */

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
