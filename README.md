# react-table-hoc-draggable-columns

> ReactTable HOC for draggable columns

[![NPM](https://img.shields.io/npm/v/react-table-hoc-draggable-columns.svg)](https://www.npmjs.com/package/react-table-hoc-draggable-columns) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Higher Order Component for [ReactTable](https://react-table.js.org) to enable Draggable columns for reordering or swapping positions. 

# Documentation

* [Install](#install)
* [Storybook examples](#usage)
* [Storybook examples](#simple-example)

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
      draggable=['firstName', 'age']
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

## License

MIT © [patricktran](https://github.com/patricktran)
