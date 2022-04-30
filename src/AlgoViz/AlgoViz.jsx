import React from 'react';
import './AlgoViz.css';


const PRIMARY_COLOR = 'tomato';
const N_ARRAY_BARS = 30;

export default class AlgoViz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < N_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(10, window.innerHeight*.75));
    }
    this.setState({array});
    this.arrayWidth = Math.max(Math.floor((window.innerWidth*.75)/N_ARRAY_BARS)-2,1)// Left offset and margins or just do fraction 
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
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
