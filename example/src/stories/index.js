import React from 'react';

import { storiesOf,addDecorator  } from '@storybook/react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import 'react-table-hoc-draggable-columns/dist/styles.css';

import SampleData from './sample-data';

const stories = storiesOf('ReactTableDraggableColumns', module);

stories
  .add('Reorder Columns', () => {

    const ReactTableDraggableColumns = withDraggableColumns(ReactTable);

    return <ReactTableDraggableColumns
      style={{
        width: '98vw',
        height: '500px'
      }}
      columns={SampleData.carColumns}
      data={SampleData.carData}
      showPagination={false}
      draggableColumns={{
        mode: 'reorder',
        draggable: ['vin', 'year', 'brand', 'color']
      }}
    />
  })
  .add('Swap Columns', () => {

    const ReactTableDraggableColumns = withDraggableColumns(ReactTable);

    return <ReactTableDraggableColumns
      style={{
        width: '98vw',
        height: '500px'
      }}
      columns={SampleData.carColumns}
      data={SampleData.carData}
      showPagination={false}
      draggableColumns={{
        mode: 'swap',
        draggable: ['vin', 'year', 'brand', 'color']
      }}
    />
  }
  )