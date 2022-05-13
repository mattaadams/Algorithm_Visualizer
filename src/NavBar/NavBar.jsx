import React from "react";
import "./NavBar.css";

// TODO:

// For fun: Add different viszualization

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAlgo: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(algorithm) {
    this.setState({ activeAlgo: algorithm });
  }

  render() {
    const { whenClickReset, whenClickReverse, changeSize, changeSpeed, arrayMax, whenClickStart } = this.props;

    return (
      <div className="navbar-container">
        <button
          disabled={this.props.running === true}
          className={this.props.running === true ? "disabled-button" : "navButton"}
          onClick={whenClickReverse}
        >
          Reverse Array
        </button>
        <button
          disabled={this.props.running === true}
          className={this.props.running === true ? "disabled-button" : "navButton"}
          onClick={whenClickReset}
        >
          New Array
        </button>
        Sorting Speed &rArr;
        <input class="slider" disabled={this.props.running === true} type="range" min="1" max="10" onChange={changeSpeed} />
        Array Size &rArr;
        <input class="slider" disabled={this.props.running === true} type="range" min="10" max={arrayMax} onChange={changeSize} />
        <button
          disabled={this.state.activeAlgo === null || this.props.running === true}
          className={this.state.activeAlgo === null || this.props.running === true ? "disabled-button" : "navButton"}
          onClick={() => whenClickStart(this.state.activeAlgo)}
        >
          Start Sorting
        </button>
        <button
          id="mergeSort"
          className={this.state.activeAlgo === "mergeSort" ? "currentAlgorithmButton" : "navButton"}
          onClick={() => this.handleClick("mergeSort")}
        >
          Merge Sort
        </button>
        <button
          className={this.state.activeAlgo === "quickSort" ? "currentAlgorithmButton" : "navButton"}
          onClick={() => this.handleClick("quickSort")}
        >
          Quick Sort
        </button>
        <button
          className={this.state.activeAlgo === "heapSort" ? "currentAlgorithmButton" : "navButton"}
          onClick={() => this.handleClick("heapSort")}
        >
          Heap Sort
        </button>
        <button
          className={this.state.activeAlgo === "selectionSort" ? "currentAlgorithmButton" : "navButton"}
          onClick={() => this.handleClick("selectionSort")}
        >
          Selection Sort
        </button>
      </div>
    );
  }
}
