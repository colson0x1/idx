import './code-shell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeShell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  // console.log(bundle);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cell;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [
      `
        const show = (value) => {
          document.querySelector('#root').innerHTML = value;
        }
      `,
    ];
    for (let c of orderedCells) {
      // Pick up all the code from the previous cells
      if (c.type === 'code') {
        cumulativeCode.push(c.content);
      }
      // Stop until it gets to the current cell
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  // console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // @ Disable ESLint - Turn off dependency check

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeShell;
