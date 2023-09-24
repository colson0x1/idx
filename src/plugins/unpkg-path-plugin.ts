import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

// Testing indexedDB
// (async () => {
//   await fileCache.setItem('name', 'Colson');

//   const name = await fileCache.getItem('name');

//   console.log(name);
// })();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // @ Figure out where index.js file is stored and all the modules within it
      // Overwrite ESBuild's natural process of trying to figure out
      // where a file is stored, what the path to it is
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      // @ Load index.js and the dependent modules
      // Overwrite ESBuild's natural way of loading up a file which is
      // to just read it directly of a file system
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react-select';
              console.log(React, useState);
            `,
          };
        }

        // Check if the file is already fetched and if it's in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // If it's in the cache, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        // Else allow the request to happen
        const { data, request } = await axios.get(args.path);
        // console.log(request);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // After receiving response back, Store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
