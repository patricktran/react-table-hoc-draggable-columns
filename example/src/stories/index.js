import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, array } from '@storybook/addon-knobs';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withDraggableColumns, { DragMode } from 'react-table-hoc-draggable-columns';
import 'react-table-hoc-draggable-columns/dist/styles.css';

import SampleData from './sample-data';

const stories = storiesOf('ReactTableDraggableColumns', module);
stories.addDecorator(withKnobs);
stories.addDecorator(storyFn => <div style={{ marginTop: '30px' }}>{storyFn()}</div>);
stories.add('Reorder Columns', () => {
  const ReactTableDraggableColumns = withDraggableColumns(ReactTable);

  return (
    <ReactTableDraggableColumns
      style={{
        width: '98vw',
        height: '500px'
      }}
      columns={SampleData.carColumns}
      data={SampleData.carData}
      showPagination={false}
      draggableColumns={{
        mode: DragMode.REORDER,
        draggable: array('draggable', ['vin', 'year', 'brand', 'color']),
        enableColumnWideDrag: boolean('enableColumnWideDrag', false),
        disableTableScroll: boolean('disableTableScroll', true),
        useDragImage: boolean('useDragImage', true),
        onDraggedColumnChange: cols => console.log('new order', cols),
        onDropSuccess: (draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset) => {
          console.log(draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset);
        }
      }}
    />
  );
});
stories
  .add('Reorder Columns - Multiple Tables', () => {
    const ReactTableDraggableColumns = withDraggableColumns(ReactTable);

    return (
      <React.Fragment>
        <ReactTableDraggableColumns
          style={{
            width: '98vw',
            height: '300px'
          }}
          columns={SampleData.carColumns}
          data={SampleData.carData}
          showPagination={false}
          draggableColumns={{
            mode: DragMode.REORDER,
            draggable: array('draggable', ['vin', 'year', 'brand', 'color']),
            enableColumnWideDrag: boolean('enableColumnWideDrag', true),
            disableTableScroll: boolean('disableTableScroll', true),
            useDragImage: boolean('useDragImage', true),
            onDraggedColumnChange: cols => console.log('new order', cols),
            onDropSuccess: (
              draggedColumn,
              targetColumn,
              oldIndex,
              newIndex,
              oldOffset,
              newOffset
            ) => {
              console.log(draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset);
            }
          }}
        />{' '}
        <br /> <br />
        <ReactTableDraggableColumns
          style={{
            width: '98vw',
            height: '300px'
          }}
          columns={SampleData.carColumns}
          data={SampleData.carData}
          showPagination={false}
          draggableColumns={{
            mode: DragMode.REORDER,
            draggable: array('draggable', ['vin', 'year', 'brand', 'color']),
            enableColumnWideDrag: boolean('enableColumnWideDrag', true),
            disableTableScroll: boolean('disableTableScroll', true),
            useDragImage: boolean('useDragImage', true),
            onDraggedColumnChange: cols => console.log('new order', cols),
            onDropSuccess: (
              draggedColumn,
              targetColumn,
              oldIndex,
              newIndex,
              oldOffset,
              newOffset
            ) => {
              console.log(draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset);
            }
          }}
        />
      </React.Fragment>
    );
  })
  .add('Swap Columns', () => {
    const ReactTableDraggableColumns = withDraggableColumns(ReactTable);

    return (
      <ReactTableDraggableColumns
        style={{
          width: '98vw',
          height: '500px'
        }}
        columns={SampleData.carColumns}
        data={SampleData.carData}
        showPagination={false}
        draggableColumns={{
          mode: DragMode.SWAP,
          draggable: array('draggable', ['vin', 'year', 'brand', 'color']),
          enableColumnWideDrag: boolean('enableColumnWideDrag', true),
          disableTableScroll: boolean('disableTableScroll', true),
          useDragImage: boolean('useDragImage', true),
          onDraggedColumnChange: cols => console.log('new order', cols),
          onDropSuccess: (
            draggedColumn,
            targetColumn,
            oldIndex,
            newIndex,
            oldOffset,
            newOffset
          ) => {
            console.log(draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset);
          }
        }}
      />
    );
  });
