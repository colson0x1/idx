import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      // wasmURL: '/esbuild.wasm',
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async (input: string) => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    // Transpiling
    /* const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    }); */

    // Bundling
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // console.log(result);

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

    // try {
    //   eval(result.outputFiles[0].text);
    // } catch (err) {
    //   alert(err);
    // }
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"><div>
        <script>
          window.addEventListener('message', (event) => {
            <!-- console.log(event.data) -->
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => {
          onClick(e.target.value);
          setInput(e.target.value);
        }}
      ></textarea>
      <div>{/* <button onClick={onClick}>Process</button> */}</div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<App />);
