# 1.3.2 (2021-05-04)

Bugfix - only call `onDraggedColumnChange` when column ordering is changed in ReactTable.
We do not want to call `onDraggedColumnChange` if column order is changed outside of ReactTable... this may
lead to an infinite loop depending on your use case.

Update eslint/prettier config

# 1.3.1 (2021-04-20)

Maintenance release adding null/optional chaining checks

# 1.3.0 (2021-04-06)

Refactor rendering process so that calling `setState` inside `onDraggedColumnChange` will not crash the HOC

`onDraggedColumnChange` and `onDropSuccess` callback method arguments refer to the original column instance and not the modified draggable instance

# 1.2.5 (2020-06-30)

Remove scarf

# 1.2.4 (2020-05-16)

Cleanup - remove leftover console.logs
Add scarf installation analytics

# 1.2.3 (2020-04-10)

Bug fix that prevented `onDraggedColumnChange` from being called if columns dragged back to their original order
Bug fix for column re-ordering not working if any of the React Table columns have `show: false` defined

# 1.2.2 (2020-01-17)

Bug fix that prevented sorting on a draggable column
Bug fix for `enableColumnWideDrag` prop by adding css `display: inline-flex` when set to {false}

# 1.2.1 (2019-10-9)

Bug fix for correctly converting a HTML Collection to Javascript array (was broken for some browsers)

# 1.2.0 (2019-10-9)

New prop `onDropSuccess` callback to obtain column information and indexes for the ondrop event (probably more info than you want to know!)

Breaking Change: Headers are now wrapped by a `div` rather than `span`. This was necessary to support column.header defined as a component

# 1.1.6 (2019-09-23)

Bug fix for reorder indicators flickering when dragleave event fired when hovering over a child element

Props for additional class names for reorder indicator up and reorder indicator down

Do not allow reorder indicators to appear outside X bounds of React Table (apparent when disableTableScroll={false})

# 1.1.0 (2019-09-19)

New prop `enableColumnWideDrag` to control a column's draggable hotspot - Set to {false} if you experience buggyness when using with react-table column sorting/resizing functionality

Bug fix for calls made to `onDraggedColumnChange` when column ordering has not changed

# 1.0.1 (2019-08-09)

Bug fix for reordering columns not working as expected under certain edge cases

# 1.0.0 (2019-07-31)

Initial release
