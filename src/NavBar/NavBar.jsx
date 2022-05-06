import React from "react";
import "./NavBar.css";

// TODO:

// Change style of scroller
// Disable buttons/scroller while the algo animation is running   (DONE)
// re-implement mergeSort
// Implement other 3 sorting algorithms
// animation speed changes
// animation style change

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
    const { whenClickReset, whenScrolled, arrayMax, whenClickStart } = this.props;

    return (
      <div
        className="navbar-container"
        style={{
          width: `${window.innerWidth}px`,
          height: `50px`,
        }}
      >
        <button
          disabled={this.props.running === true}
          className={this.props.running === false ? "new-array-button" : "disabled-button"}
          onClick={whenClickReset}
        >
          New Array
        </button>
        Change Array Size --
        <input id="changeSize" disabled={this.props.running === true} type="range" min="10" max={arrayMax} onChange={whenScrolled} />
        <button
          disabled={this.state.activeAlgo === null || this.props.running === true}
          className={this.state.activeAlgo === null || this.props.running === true ? "disabled-button" : "new-array-button"}
          onClick={() => whenClickStart(this.state.activeAlgo)}
        >
          Start Sorting
        </button>
        <button
          id="mergeSort"
          className={this.state.activeAlgo === "mergeSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("mergeSort")}
        >
          Merge Sort
        </button>
        <button
          className={this.state.activeAlgo === "quickSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("quickSort")}
        >
          Quick Sort
        </button>
        <button
          className={this.state.activeAlgo === "heapSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("heapSort")}
        >
          Heap Sort
        </button>
        <button
          className={this.state.activeAlgo === "selectionSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("selectionSort")}
        >
          Selection Sort
        </button>
      </div>
    );
  }
}