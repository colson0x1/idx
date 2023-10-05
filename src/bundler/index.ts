import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esbuild.Service;
const codeBundler = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      // wasmURL: '/esbuild.wasm',
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  // Transpiling
  /* const result = await ref.current.transform(input, {
    loader: 'jsx',
    target: 'es2015',
  }); */

  // Bundling
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  // console.log(result);

  // try {
  //   eval(result.outputFiles[0].text);
  // } catch (err) {
  //   alert(err);
  // }

  return result.outputFiles[0].text;
};

export default codeBundler;
