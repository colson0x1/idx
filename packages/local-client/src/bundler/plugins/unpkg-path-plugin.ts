import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // @ Handle root entry file of 'index.js'
      // @ Figure out where index.js file is stored and all the modules within it
      // Overwrite ESBuild's natural process of trying to figure out
      // where a file is stored, what the path to it is
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // @ Handle relative paths in a module
      // Check to see if the file path is relative [./ or ../]
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      // @ Handle main file of a module
      // Resolve root module name [Ex: src/]
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
