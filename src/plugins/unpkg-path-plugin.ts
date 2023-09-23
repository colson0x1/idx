import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // @ Figure out where index.js file is stored the 1st time
      // and where message.js is stored, the second time
      // Overwrite ESBuild's natural process of trying to figure out
      // where a file is stored, what the path to it is
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });

      // @ Load index.js the 1st time and message.js, the 2nd time
      // Overwrite ESBuild's natural way of loading up a file which is
      // to just read it directly of a file system
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "Yo, sup!"',
          };
        }
      });
    },
  };
};
