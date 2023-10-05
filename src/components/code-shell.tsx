import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeShell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="{/* JS/JSX */}"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Process</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeShell;
