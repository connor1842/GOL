import React from "react";
import LifeCell from "./LifeCell";
import Grid from '@material-ui/core/Grid';

const NUM_ROWS = 30;
const NUM_COLS = 30;

function safeIndex(num)
{
  if (num < 0)
    return NUM_ROWS + (num);
  if (num > (NUM_ROWS - 1))
    return (num % NUM_ROWS);
  return num;
}


class GOLGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	childStates: [],
      	running: false
    };

    this.generateChildren   = this.generateChildren.bind(this);
    this.changeChildState   = this.changeChildState.bind(this);
    this.LifeGrid           = this.LifeGrid.bind(this);
    this.handleStartClick   = this.handleStartClick.bind(this);
    this.handleNextClick    = this.handleNextClick.bind(this);
    this.calculateLife      = this.calculateLife.bind(this);
    this.getLivingNeighbors = this.getLivingNeighbors.bind(this);
    this.calcLifeState      = this.calcLifeState.bind(this);

    for (var i = 0; i < NUM_ROWS; i++) {
      const row = [];
      for (var j = 0; j < NUM_COLS; j++) {
        row[j] = false;
      }
      this.state.childStates[i] = row;
    }

    window.setInterval(()=> {if (this.state.running) this.calculateLife();}, 150);
  }

  calculateLife()
  {
    let newStates = [];
    for (var i = 0; i < NUM_ROWS; i++)
    {
      newStates[i] = [...this.state.childStates[i]];
      for (var j = 0; j < NUM_COLS; j++)
      {
        let numNeighbors = this.getLivingNeighbors(i, j);
        newStates[i][j] = this.calcLifeState(this.state.childStates[i][j], numNeighbors);
      }
    }
    this.setState({childStates: [...newStates]});
  }

  getLivingNeighbors(row, col)
  {
    return (
        this.state.childStates[safeIndex(row + 1)][col] +
        this.state.childStates[safeIndex(row - 1)][col] +
        this.state.childStates[safeIndex(row + 1)][safeIndex(col + 1)] +
        this.state.childStates[safeIndex(row - 1)][safeIndex(col + 1)] +
        this.state.childStates[safeIndex(row - 1)][safeIndex(col - 1)] +
        this.state.childStates[safeIndex(row + 1)][safeIndex(col - 1)] + 
        this.state.childStates[row][safeIndex(col + 1)] +
        this.state.childStates[row][safeIndex(col - 1)]
      );
  }

  calcLifeState(currentState, livingNeighbors)
  {
    if (livingNeighbors === 3 || (currentState && livingNeighbors === 2))
      return true;
    return false;
  }

  changeChildState(row, column) {
  	let newStates = [...this.state.childStates];
  	newStates[row][column] = !newStates[row][column];
  	this.setState({
  		childStates: [...newStates]
  	});
  }

  handleStartClick()
  {
    this.setState({running: !this.state.running});
  }

  handleNextClick()
  {
  	this.calculateLife();
  }

  LifeGrid(props) {
  	return (
      <div>
        <this.generateChildren />
        <button onClick={this.handleStartClick}>
          {(this.state.running) ? "Stop" : "Start"}
        </button>
        <button onClick={()=>this.handleNextClick()}>Next</button>
      </div>
  	);
  }

  generateChildren(props) {
  const gridStyle = {
    display: 'grid',
    width: "50%",
    marginLeft: "25%",
    marginTop: "200px",
    gridTemplateColumns: "repeat(" + NUM_COLS + ", auto)",
    gridGap: 1
  };
  	let arr = [];
  	for (var i = 0; i < NUM_ROWS; i++) {
  		const row = [];
  		for (var j = 0; j < NUM_COLS; j++) {
  			row[j] = (<LifeCell 
  						alive={this.state.childStates[i][j]} 
  						row={i} 
  						column={j} 
  						report={this.changeChildState} 
  					 />);
  		}
  		arr[i] = row;
  	}
  	const retval = arr;
  	return (<Grid id="MainGrid" container spacing={1} direction="column" style={gridStyle}>
  				{retval}
  				</Grid>);
  }

  render() {
  	return (
  		<this.LifeGrid />
  	);
  }

}

export default GOLGrid;