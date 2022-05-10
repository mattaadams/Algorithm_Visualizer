/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_" }]*/

import React from "react";
import "./AlgoViz.css";
import NavBar from "../NavBar/NavBar";
import { getMergeSortAnimations } from "../Algos/MergeSort.js";
import { getSelectionSortAnimations } from "../Algos/SelectionSort.js";
import { getQuickSortAnimations } from "../Algos/QuickSort.js";
import { getHeapSortAnimations } from "../Algos/HeapSort.js";

const PRIMARY_COLOR = "aqua";
const SECONDARY_COLOR = "red";

export default class AlgoViz extends React.Component {
  constructor(props) {
    super(props);
    this.changeBarWidth = this.changeBarWidth.bind(this);
    this.resetArray = this.resetArray.bind(this);
    this.reverseArray = this.reverseArray.bind(this);

    this.mergeSort = this.mergeSort.bind(this);

    this.n_bars = 30;
    this.max_n_bars = 300;
    this.state = {
      array: [],
      activeIndex: null,
      running: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  handleClick = (index) => this.setState({ activeIndex: index });

  resetArray() {
    const array = [];

    for (let i = 0; i < this.n_bars; i++) {
      array.push(randomIntFromInterval(10, window.innerHeight * 0.9));
    }
    this.setState({ array });
    this.arrayWidth = Math.max(Math.floor((window.innerWidth - 200) / this.n_bars) - 2, 1); // Left offset and margins or just do fraction
    this.animation_speed = 10 * (this.max_n_bars / this.n_bars); // Slower animation for less bars, replace 300 with max_bar
  }

  reverseArray() {
    let reverseArray = this.state.array.reverse();
    this.setState({ reverseArray });
  }

  changeBarWidth(evt) {
    this.n_bars = evt.target.value;
    this.resetArray();
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animation_speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.animation_speed);
      }
    }
    setTimeout(() => {
      this.setState({ running: false });
    }, animations.length * this.animation_speed);
  }
  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = animations[i][0];
      if (isColorChange < 3) {
        const [_key, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][0] === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animation_speed);
      } else {
        setTimeout(() => {
          const [_key, barOneIdx, newHeight, barTwoIdx, oldHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${newHeight}px`;
          barTwoStyle.height = `${oldHeight}px`;
        }, i * this.animation_speed);
      }
    }
    setTimeout(() => {
      this.setState({ running: false });
    }, animations.length * this.animation_speed);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = animations[i][0];
      if (isColorChange < 3) {
        const [_key, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][0] === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animation_speed);
      } else {
        setTimeout(() => {
          const [_key, barOneIdx, newHeight, barTwoIdx, oldHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${newHeight}px`;
          barTwoStyle.height = `${oldHeight}px`;
        }, i * this.animation_speed);
      }
    }
    setTimeout(() => {
      this.setState({ running: false });
    }, animations.length * this.animation_speed);
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = animations[i][0];
      if (isColorChange < 3) {
        const [_key, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][0] === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * this.animation_speed) / 5);
      } else {
        setTimeout(() => {
          const [_key, barOneIdx, newHeight, barTwoIdx, oldHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${newHeight}px`;
          barTwoStyle.height = `${oldHeight}px`;
        }, (i * this.animation_speed) / 5);
      }
    }
    setTimeout(() => {
      this.setState({ running: false });
    }, (animations.length * this.animation_speed) / 5);
  }

  startSorting(algo) {
    this.setState({ running: true }, () => {
      if (algo === "mergeSort") {
        this.mergeSort();
      } else if (algo === "quickSort") {
        this.quickSort();
      } else if (algo === "heapSort") {
        this.heapSort();
      } else if (algo === "selectionSort") {
        this.selectionSort();
      }
    });
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              width: `${this.arrayWidth}px`,
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <NavBar
          whenClickReset={this.resetArray}
          whenClickReverse={this.reverseArray}
          whenClickStart={(algo) => this.startSorting(algo)}
          whenScrolled={this.changeBarWidth}
          arrayMax={this.max_n_bars}
          running={this.state.running}
        ></NavBar>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
