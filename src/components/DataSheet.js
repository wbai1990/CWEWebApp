import React from "react";
import ReactDataSheet from "react-datasheet";
// Be sure to include styles at some point, probably during your bootstrapping

class DataSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid:[],
    };
  }

 

  generateGrid(){
    let rows = [];

    // parse first title row
    let titleRow =[[{readOnly:true, value:null}]];
    for (var i = 0; i < this.props.titles.length; i ++){
      titleRow[0].push({readOnly: true, value: `${this.props.titles[i]}`})
    }
    rows = rows.concat(titleRow)
    // process data rows
    const rowCount = this.props.rowCount;
    const data = this.props.data;
    const titles = this.props.titles;
    for (i = 0; i < rowCount; i ++){
      var row = [{readOnly: true, value : `${i+1}`}]
    
      if (i < data.length){
        for (var j = 0; j < titles.length; j ++){
          const content = data[i][j] || data[i][j] === 0 ? {readOnly:false, value:`${data[i][j]}`} : {readOnly:false, value: null}
          row.push(content)
        }
      } else {
        for (j = 0; j < titles.length; j ++){
          row.push({readOnly:false, value:null})
        }
      }
      rows.push(row)
    }

    return rows;
  }

  handleChanges (change){

  }

  componentDidMount(){
    this.setState({
      grid:this.generateGrid(),
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.data !== this.props.data || prevProps.rowCount !== this.props.rowCount) {
      this.setState({
        grid:this.generateGrid()
      })
    }
  }

  render() {
    return (
      <div>
        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onContextMenu={(e, cell, i, j) =>
            cell.readOnly ? e.preventDefault() : null
          }
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
        >
  
        </ReactDataSheet>
      </div>

    );
  }
}

export default DataSheet;
