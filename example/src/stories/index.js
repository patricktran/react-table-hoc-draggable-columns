import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import 'react-table-hoc-draggable-columns/dist/styles.css';

import SampleData from './sample-data';

const stories = storiesOf('ReactTableDraggableColumns', module);
stories.addDecorator(withKnobs);
stories.addDecorator(storyFn => <div style={{ marginTop: '30px' }}>{storyFn()}</div>)
stories
  .add('Reorder Columns', () => {
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
          mode: 'reorder',
          draggable: text('draggable', ['vin', 'year', 'brand', 'color']),
          enableColumnWideDrag: boolean('enableColumnWideDrag', true),
          disableTableScroll: boolean('disableTableScroll', true),
          useDragImage: boolean('useDragImage', true),
          onDraggedColumnChange: cols => console.log('new order', cols)
        }}
      />
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
          mode: 'swap',
          draggable: text('draggable', ['vin', 'year', 'brand', 'color']),
          enableColumnWideDrag: boolean('enableColumnWideDrag', true),
          disableTableScroll: boolean('disableTableScroll', true),
          useDragImage: boolean('useDragImage', true),
            onDraggedColumnChange: cols => console.log('new order', cols)
        }}
      />
    );
  });
