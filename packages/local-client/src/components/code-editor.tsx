import './code-editor.css';
import './syntax.css';
import { useEffect, useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

interface MonacoVimType {
  initVimMode(editor: any, statusline: Element | null): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  const statuslineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && statuslineRef.current) {
      window.require.config({
        paths: {
          'monaco-vim': 'https://unpkg.com/monaco-vim/dist/monaco-vim',
        },
      });

      window.require(['monaco-vim'], function (MonacoVim: MonacoVimType) {
        MonacoVim.initVimMode(editorRef.current, statuslineRef.current);
      });
    }
  }, [editorRef.current, statuslineRef.current]);

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );

    // Configure Vim
    /*
    window.require.config({
      paths: {
        'monaco-vim': 'https://unpkg.com/monaco-vim/dist/monaco-vim',
      },
    });

    window.require(['monaco-vim'], function (MonacoVim: MonacoVimType) {
      const statusline = document.querySelector('.statusline');

      if (statusline) {
        MonacoVim.initVimMode(monacoEditor, statusline);
      }
    });
    */
  };

  const onFormatClick = () => {
    console.log(editorRef.current);
    // Get current value from the editor
    const unformatted = editorRef.current.getModel().getValue();

    // Format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // Set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme='dark'
        language='javascript'
        height='100%'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      <div className='statusline' ref={statuslineRef}></div>
    </div>
  );
};

export default CodeEditor;
