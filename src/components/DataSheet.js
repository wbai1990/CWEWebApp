import React from "react";
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping


class DataSheet extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
          grid: [
            [
              {readOnly: true, value: ''},
              {value: 'Plan Company', readOnly: true},
              {value: 'Product', readOnly: true},
              {value: 'Channel', readOnly: true},
              {value: 'Account', readOnly: true},
              {value: 'Jan', readOnly: true},
              {value: 'Feb', readOnly: true},
              {value: 'Mar', readOnly: true},
              {value: 'Apr', readOnly: true},
              {value: 'May', readOnly: true},
              {value: 'Jun', readOnly: true},
              {value: 'Jul', readOnly: true},
              {value: 'Aug', readOnly: true},
              {value: 'Sep', readOnly: true},
              {value: 'Oct', readOnly: true},
              {value: 'Nov', readOnly: true},
              {value: 'Dec', readOnly: true},
              
            ],
            [{readOnly: true, value: 1}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}],
            [{readOnly: true, value: 2}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}],
            [{readOnly: true, value: 3}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}],
            [{readOnly: true, value: 4}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}, {value: null}],
          ]
        }
      }
      render () {
        return (
          <ReactDataSheet
            data={this.state.grid}
            valueRenderer={(cell) => cell.value}
            onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
            onCellsChanged={changes => {
              const grid = this.state.grid.map(row => [...row])
              changes.forEach(({cell, row, col, value}) => {
                grid[row][col] = {...grid[row][col], value}
              })
              this.setState({grid})
            }}
          />
        )
      }
}

export default DataSheet