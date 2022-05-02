import React from 'react';
import './AlgoViz.css';
import NavBar from '../NavBar/NavBar';
const PRIMARY_COLOR = 'tomato';

export default class AlgoViz extends React.Component {
  constructor(props) {
    super(props);
    this.changeBarWidth = this.changeBarWidth.bind(this);
    this.resetArray = this.resetArray.bind(this);

    this.n_bars = 10
    this.state = {
      array: [],
    };

  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];

    for (let i = 0; i < this.n_bars; i++) {
      array.push(randomIntFromInterval(10, window.innerHeight*.9));
    }
    this.setState({array});
    this.arrayWidth = Math.max(Math.floor((window.innerWidth-200)/this.n_bars)-2,1)// Left offset and margins or just do fraction 
  }

  changeBarWidth(evt){
    this.n_bars = evt.target.value
    this.resetArray()

  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
          className="array-bar" 
          key={idx}
          style={{
            width: `${this.arrayWidth}px`,
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`
          }}></div>
        ))}
        <NavBar whenClicked={this.resetArray}></NavBar>
        
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
