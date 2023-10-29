import { Cell } from '../state';
import CodeShell from './code-shell';
import TextEditor from './text-editor';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const dispatch = useDispatch();

  dispatch(actionCreators.updateCell('001', 'coding is awesome!'));

  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeShell />;
  } else {
    child = <TextEditor />;
  }

  return <div>{child}</div>;
};

export default CellListItem;
