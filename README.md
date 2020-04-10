# react-table-hoc-draggable-columns

> ReactTable HOC for draggable columns

[![NPM](https://img.shields.io/npm/v/react-table-hoc-draggable-columns.svg)](https://www.npmjs.com/package/react-table-hoc-draggable-columns) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Higher Order Component for [ReactTable](https://react-table.js.org) to enable Draggable columns for reordering or swapping positions.

\*Note: This version supports V6 of React Table.

# Documentation

- [Install](#install)
- [Usage](#usage)
- [Demo](https://patricktran.github.io/react-table-hoc-draggable-columns/)

## Install

```bash
npm install --save react-table-hoc-draggable-columns
```

## Usage

```js
import ReactTable from 'react-table';
import "react-table/react-table.css";
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import 'react-table-hoc-draggable-columns/dist/styles.css';

const ReactTableDraggableColumns = withDraggableColumns(ReactTable);
...
render () {
  return (
    <ReactTableDraggableColumns
      draggableColumns= {{
        mode: 'reorder',
        draggable: ['firstName', 'age']
      }}
      data={data}
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
        ...
        {
          Header: 'age',
          accessor: 'age',
        }
      ]}
    />
  )
}
```

## Special Considerations

If any of your React Table columns are hidden (show: false), this HOC will automatically move those columns to the end of the list. This is to prevent hidden columns from throwing off calculating the updated column order.

ReactTable Columns Props [https://github.com/tannerlinsley/react-table/tree/v6.10.0#columns]

## draggableColumns Prop

| Property                        | Description                                                                                                                                             | Default value        | Type             | Required |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------- | -------- |
| `mode`                          | mode to either 'reorder' the column or 'swap' column position on drop                                                                                   | 'reorder'            | string           | yes      |
| `draggable`                     | array of string-based column accessors or column ids (when using a custom accessor) to allow drag and drop                                              |                      | array of strings |          |
| `enableColumnWideDrag`          | when {true} entire column is draggable. when {false} only header text is draggable                                                                      | true                 | bool             |          |
| `disableTableScroll`            | disable ReactTable horizontal/vertical scrolling when dragging a column                                                                                 | false                | bool             |          |
| `overflow`                      | used with disableTableScroll={true} to reset ReactTable overflow style onDragEnd event                                                                  | `auto`               | string           |          |
| `useDragImage`                  | clone dragged column element? useful for applying a different css class.                                                                                | true                 | bool             |          |
| `dragImageClassName`            | dragImageClassName only applies when useDragImage={true}                                                                                                | `rt-dragged-item`    | string           |          |
| `onDragEnterClassName`          | when mode={'swap'} - css class applied on dragged over column                                                                                           | `rt-drag-enter-item` | string           |          |
| `onDraggedColumnChange`         | callback method to be notified when column order changes - signature: function(columns)                                                                 |                      | function         |          |
| `onDropSuccess`                 | callback method to be notified when on column drop success - signature: function(draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset) |                      | function         |          |
| `reorderIndicatorUpClassName`   | additional className for reorder indicator Up                                                                                                           |                      | string           |          |
| `reorderIndicatorDownClassName` | additional className for reorder indicator Down                                                                                                         |                      | string           |          |

## License

MIT © [patricktran](https://github.com/patricktran)
