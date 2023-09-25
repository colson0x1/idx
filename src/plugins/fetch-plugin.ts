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

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // @ Load index.js and the dependent modules
      // Overwrite ESBuild's natural way of loading up a file which is
      // to just read it directly of a file system
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        // Check if the file is already fetched and if it's in the cache
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );

        // If it's in the cache, return it immediately
        // if (cachedResult) {
        //   return cachedResult;
        // }

        // Else allow the request to happen
        const { data, request } = await axios.get(args.path);
        // console.log(request);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        const contents =
          fileType === 'css'
            ? `
            const style = document.createElement('style');
            style.innerText = 'body { background-color: "#4285F4" }';
            document.head.appendChild(style);
          `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // After receiving response back, Store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
