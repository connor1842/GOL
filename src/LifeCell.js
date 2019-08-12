import React from "react";
import Grid from '@material-ui/core/Grid';


class LifeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbors: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  addNeighbor(item)
  {
    const newNeighborList = [...this.state.neighbors, item];
    this.setState({
      neighbors: newNeighborList
    });
  }

  handleClick()
  {
    this.props.report(this.props.row, this.props.column);
  }

  render() {
    const divStyle = {
      background: (this.props.alive) ? "red" : "white",
      width: "5px",
      height: "5px",
      border: "1px solid black"
    };
    return (
        <Grid 
          item
          className="life-cell" 
          id={"row-" + this.props.row + "-column-" + this.props.column} 
          style={divStyle}
          onClick={this.handleClick}
          xs={1}
          >
        </Grid>
      );
  }
}

export default LifeCell;
