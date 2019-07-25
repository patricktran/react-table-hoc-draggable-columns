import React from 'react'
import PropTypes from 'prop-types'
import DomHelper from './dom-helper'
import './styles.scss'

const DragMode = {
  REORDER: 'reorder',
  SWAP: 'swap'
}

export default Component => {
  const wrapper = class RTFixedDraggableColumn extends React.Component {
    getWrappedInstance() {
      if (!this.wrappedInstance) console.warn('RTDraggableColumn - No wrapped instance')
      if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance()
      else return this.wrappedInstance
    }

    containerRef = React.createRef();

    constructor(props) {
      super(props)
      this.dragged = null
      this.reorder = []
      this.state = {
        trigger: 0,
        firstLoad: true
      }
    }

    // helper methods
    findParentHeader(element) {
      if (element.className.includes('rt-th')) {
        return element
      } else {
        let parent = element.parentElement
        while (!parent.className.includes('rt-th')) {
          parent = parent.parentElement
          if (!parent) break
        }
        return parent
      }
    }
    // end helper methods

    createDragEvents() {
      const headers = Array.prototype.slice.call(document.querySelectorAll('.draggable-header'))

      headers.forEach((header, i) => {
        // only allow drag events on drag enabled columns
        if (header.className.includes('enable-drag')) {
          const headerParent = header.parentNode

          headerParent.setAttribute('draggable', true)

          // ondragstart event
          headerParent.ondragstart = e => {
            e.stopPropagation()

            const {
              draggableColumns: {
                disableTableScroll,
                useDragImage = defaultProps.useDragImage,
                dragImageClassName = defaultProps.dragImageClassName
              }
            } = this.props

            if (disableTableScroll) {
              const tableBody = DomHelper.findFirstChildWithClassName(
                this.containerRef.current,
                'rt-table'
              )

              if (tableBody) {
                tableBody.style.overflow = 'hidden'
              }
            }

            // counter used as a workaround for dragleave event fired when hovering over a child element
            this.counter = 0
            this.dragged = i
            this.draggedName = DomHelper.stripHtml(headerParent)
            this.draggedColumn = this.findParentHeader(headerParent)

            this.iconWidth = DomHelper.getHiddenElementOuterWidth(this.reorderIndicatorUp)
            this.iconHeight = DomHelper.getHiddenElementOuterHeight(this.reorderIndicatorUp)

            e.dataTransfer.setData('text', 'b') // Firefox requires this to make dragging possible

            if (useDragImage) {
              const crt = this.draggedColumn.cloneNode(true)

              crt.className = dragImageClassName
              const columnWidth = DomHelper.getElementWidth(this.draggedColumn)
              const columnHeight = DomHelper.getElementHeight(this.draggedColumn)
              // calculate offset from draggedColumn element
              let xOffSet = Math.floor(columnWidth / 2)
              const yOffSet = Math.floor(columnHeight / 2)

              // max-width of 150px, otherwise it looks blurry in Chrome (Windows)
              if (columnWidth > 150) {
                crt.style.width = '150px'
                xOffSet = 150 / 2
              }

              crt.style.position = 'absolute'
              crt.style.top = '-1000px'

              document.body.appendChild(crt)
              e.dataTransfer.effectAllowed = 'move'
              e.dataTransfer.setDragImage(crt, xOffSet, yOffSet)

              // set refernce to cloned Node
              this.clone = crt
            }
          }

          // ondrag event
          headerParent.ondrag = e => {
            e.stopPropagation()
          }

          headerParent.ondragenter = e => {
            e.stopPropagation()
            e.preventDefault()
            this.counter++
            if (DomHelper.stripHtml(e.target) !== this.draggedName) {
              const {
                draggableColumns: {
                  mode = defaultProps.mode,
                  onDragEnterClassName = defaultProps.onDragEnterClassName
                }
              } = this.props

              if (mode === DragMode.SWAP && onDragEnterClassName) {
                const dropHeader = this.findParentHeader(e.target)
                DomHelper.addClass(dropHeader.firstChild, onDragEnterClassName)
              }
            }
          }

          // ondragover event
          headerParent.ondragover = e => {
            e.preventDefault()

            const {
              draggableColumns: { mode = defaultProps.mode }
            } = this.props

            const dropHeader = this.findParentHeader(e.target)

            // in reorder mode only
            if (mode === DragMode.REORDER) {
              if (DomHelper.stripHtml(e.target) !== this.draggedName) {
                const containerOffset = DomHelper.getOffset(this.containerRef.current)
                const dropHeaderOffset = DomHelper.getOffset(dropHeader)
                const targetLeft = dropHeaderOffset.left - containerOffset.left
                const columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2

                this.reorderIndicatorUp.style.top =
                  dropHeaderOffset.top - containerOffset.top - (this.iconHeight + 3) + 'px'

                this.reorderIndicatorDown.style.top =
                  dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 3 + 'px'

                if (e.pageX > columnCenter) {
                  this.reorderIndicatorUp.style.left =
                    targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px'
                  this.reorderIndicatorDown.style.left =
                    targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px'
                  this.dropPosition = 1
                } else {
                  this.reorderIndicatorUp.style.left =
                    targetLeft - Math.ceil(this.iconWidth / 2) + 'px'
                  this.reorderIndicatorDown.style.left =
                    targetLeft - Math.ceil(this.iconWidth / 2) + 'px'
                  this.dropPosition = -1
                }

                this.reorderIndicatorUp.style.display = 'block'
                this.reorderIndicatorDown.style.display = 'block'
                this.reorderIndicatorUp.style.zIndex = 50
                this.reorderIndicatorDown.style.zIndex = 50
              }
            }
          }

          headerParent.ondragleave = e => {
            e.preventDefault()

            this.counter--
            const {
              draggableColumns: {
                mode = defaultProps.mode,
                onDragEnterClassName = defaultProps.onDragEnterClassName
              }
            } = this.props

            if (mode === DragMode.REORDER) {
              this.reorderIndicatorUp.style.display = 'none'
              this.reorderIndicatorDown.style.display = 'none'
            } else if (mode === DragMode.SWAP) {
              if (this.counter === 0 && onDragEnterClassName) {
                const dropHeader = this.findParentHeader(e.target)
                DomHelper.removeClass(dropHeader.firstChild, onDragEnterClassName)
              }
            }
          }

          // ondrop event
          headerParent.ondrop = e => {
            e.preventDefault()

            const {
              draggableColumns: { mode = defaultProps.mode }
            } = this.props

            if (mode === DragMode.REORDER) {
              // only move if the dragged column is meets position threshold
              let dragIndex = DomHelper.index(this.draggedColumn)
              let dropIndex = DomHelper.index(this.findParentHeader(e.target))
              let allowDrop = dragIndex !== dropIndex

              if (
                allowDrop &&
                ((dropIndex - dragIndex === 1 && this.dropPosition === -1) ||
                  (dragIndex - dropIndex === 1 && this.dropPosition === 1))
              ) {
                allowDrop = false
              }
              if (allowDrop) {
                this.reorder.push({ a: i, b: this.dragged })

                // trigger a re-render
                this.setState({ trigger: Math.random(), firstLoad: false })
              }
            } else if (mode === DragMode.SWAP) {
              this.reorder.push({ a: i, b: this.dragged })

              // trigger a re-render
              this.setState({ trigger: Math.random(), firstLoad: false })
            }

            this.dragged = null
            this.draggedName = null
            this.draggedColumn = null
            this.dropPosition = null
            this.counter = 0
            this.reorderIndicatorUp.style.display = 'none'
            this.reorderIndicatorDown.style.display = 'none'
          }

          // ondragend event
          headerParent.ondragend = e => {
            const {
              draggableColumns: { disableTableScroll, overflow }
            } = this.props

            e.stopPropagation()

            if (this.clone) {
              document.body.removeChild(this.clone)
              this.clone = null
            }

            if (disableTableScroll) {
              const tableBody = DomHelper.findFirstChildWithClassName(
                this.containerRef.current,
                'rt-table'
              )

              if (tableBody) {
                tableBody.style.overflow = overflow || defaultProps.overflow
              }
            }
          }
        }
      })
    }

    componentDidMount() {
      if (this.props.draggableColumns.draggable.length > 0) this.createDragEvents()
    }

    componentDidUpdate() {
      if (this.props.draggableColumns.draggable.length > 0) this.createDragEvents()
    }

    // prevent side effects such as accidentally resizing column while dragging a column
    stopPropagation = e => {
      e.stopPropagation()
    };

    render() {
      const { columns, draggableColumns, ...rest } = this.props
      const {
        draggable = defaultProps.draggable,
        mode = defaultProps.mode,
        onDraggedColumnChange
      } = draggableColumns

      let reorderIndicatorUp = (
        <span
          ref={el => {
            this.reorderIndicatorUp = el
          }}
          className='arrow arrow-bar is-top'
          style={{ position: 'absolute', display: 'none' }}
        />
      )

      let reorderIndicatorDown = (
        <span
          ref={el => {
            this.reorderIndicatorDown = el
          }}
          className='arrow arrow-bar is-bottom'
          style={{ position: 'absolute', display: 'none' }}
        />
      )

      const cols = columns.map(col => {
        let headerClassName = 'draggable-header'

        // add additional className if column is draggable enabled
        if (
          (draggable.length > 0 && draggable.includes(col.id)) ||
          draggable.includes(col.accessor)
        ) {
          headerClassName = `${headerClassName} enable-drag`
        }

        return {
          ...col,
          Header:
            typeof col.Header === 'function' ? (
              <span onClick={this.stopPropagation} className={headerClassName}>
                {col.Header()}
              </span>
            ) : (
              <span onClick={this.stopPropagation} className={headerClassName}>
                {col.Header}
              </span>
            )
        }
      })

      // run all reorder events
      if (mode && mode === DragMode.SWAP) {
        this.reorder.forEach(o => (cols[o.a] = cols.splice(o.b, 1, cols[o.a])[0]))
      } else {
        // mode: reorder - default
        this.reorder.forEach(o => cols.splice(o.a, 0, cols.splice(o.b, 1)[0]))
      }

      // fire change event?
      if (!this.state.firstLoad) {
        const originalOrder = columns.map(col => {
          if (col.accessor === 'function') return col.id
          return col.accessor
        })

        const newOrder = cols.map(col => {
          if (col.accessor === 'function') return col.id
          return col.accessor
        })

        // if order is not equal, then call onDraggedColumnChange prop
        if (JSON.stringify(originalOrder) !== JSON.stringify(newOrder)) { if (onDraggedColumnChange) onDraggedColumnChange(cols) }
      }

      // render
      return (
        <div
          className='rt-draggable-container'
          ref={this.containerRef}
          style={{ position: 'relative' }}
        >
          <Component
            {...rest}
            draggableColumns={draggableColumns}
            columns={cols}
            ref={r => (this.wrappedInstance = r)}
          />
          {reorderIndicatorUp}
          {reorderIndicatorDown}
        </div>
      )
    }
  }

  const defaultProps = {
    mode: DragMode.REORDER,
    draggable: [],
    disableTableScroll: false,
    overflow: 'auto',
    useDragImage: true,
    dragImageClassName: 'rt-dragged-item',
    onDragEnterClassName: 'rt-drag-enter-item'
  }

  wrapper.displayName = 'RTDraggableColumn'

  wrapper.propTypes = {
    draggableColumns: PropTypes.shape({
      /** mode to either reorder the column or swap column position on drop */
      mode: PropTypes.oneOf([DragMode.REORDER, DragMode.SWAP]).isRequired,
      /** array of column accessors to allow drag and drop */
      draggable: PropTypes.arrayOf(PropTypes.string),
      /** disable ReactTable horizontal/vertical scrolling when dragging a column */
      disableTableScroll: PropTypes.bool,
      /** used with disableTableScroll={true} to reset ReactTable overflow style onDragEnd event */
      overflow: PropTypes.string,
      /** clone dragged column?  useful for applying a different css class */
      useDragImage: PropTypes.bool,
      /** dragImageClassName only applies when useDragImage={true} */
      dragImageClassName: PropTypes.string,
      /** Swap mode only - css class */
      onDragEnterClassName: PropTypes.string,
      /** callback method to be notified when column order changes - signature: function(columns)  */
      onDraggedColumnChange: PropTypes.func
    })
  }

  return wrapper
}
