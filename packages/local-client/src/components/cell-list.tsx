import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cell: { order, data } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    saveCells();

    // [JSON.stringify(cells)]
    // Take list of cells, convert it into bit long string. If that string
    // ever changes between renders of our component, that'll be a sign that
    // we want to call our saveCells action creators
  }, [JSON.stringify(cells)]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  renderedCells.push();

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
