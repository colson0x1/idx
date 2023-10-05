import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="console.log('Yo!');"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Process</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<App />);
