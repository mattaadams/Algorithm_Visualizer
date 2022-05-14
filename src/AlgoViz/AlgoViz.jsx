/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_" }]*/

// TODO:

// Make visualization code better, and make visualizations better (more color, better transition)
// color slider
// better buttons

import React from "react";
import "./AlgoViz.css";
import NavBar from "../NavBar/NavBar";
import { getMergeSortAnimations } from "../Algos/MergeSort.js";
import { getSelectionSortAnimations } from "../Algos/SelectionSort.js";
import { getQuickSortAnimations } from "../Algos/QuickSort.js";
import { getHeapSortAnimations } from "../Algos/HeapSort.js";

const PRIMARY_COLOR = "rgb(4, 209, 255)";
const SECONDARY_COLOR = "tomato";
const TERTIARY_COLOR = "violet";
const QUATERNARY_COLOR = "#66FF00";
export default class AlgoViz extends React.Component {
  constructor(props) {
    super(props);
    this.changeBarWidth = this.changeBarWidth.bind(this);
    this.changeSortSpeed = this.changeSortSpeed.bind(this);
    this.resetArray = this.resetArray.bind(this);
    this.reverseArray = this.reverseArray.bind(this);

    this.n_bars = 30;
    this.max_n_bars = 300;
    this.max_speed = 500;
    this.animation_speed = 1;
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
  }

  reverseArray() {
    let reverseArray = this.state.array.reverse();
    this.setState({ reverseArray });
  }

  changeBarWidth(evt) {
    this.n_bars = evt.target.value;
    this.resetArray();
  }

  changeSortSpeed(evt) {
    this.animation_speed = 1 + this.max_speed - evt.target.value * 50;
  }

  runSort(algoAnimation) {
    const animations = algoAnimation;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = animations[i][0];
      if (isColorChange < 3) {
        setTimeout(() => {
          const [_key, barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = animations[i][0] === 1 ? SECONDARY_COLOR : animations[i][0] === 0 ? TERTIARY_COLOR : PRIMARY_COLOR;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animation_speed);
      } else if (isColorChange === 6) {
        setTimeout(() => {
          const [_key, barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.animation_speed);
      } else if (isColorChange >= 7) {
        setTimeout(() => {
          const [_key, barOneIdx, barTwoIdx, barThreeIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const barThreeStyle = arrayBars[barThreeIdx].style;
          const color = animations[i][0] === 7 ? QUATERNARY_COLOR : PRIMARY_COLOR;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barThreeStyle.backgroundColor = color;
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

  startSorting(algo) {
    this.setState({ running: true }, () => {
      let animation;
      if (algo === "mergeSort") {
        animation = getMergeSortAnimations(this.state.array);
      } else if (algo === "quickSort") {
        animation = getQuickSortAnimations(this.state.array);
      } else if (algo === "heapSort") {
        animation = getHeapSortAnimations(this.state.array);
      } else if (algo === "selectionSort") {
        animation = getSelectionSortAnimations(this.state.array);
      }
      this.runSort(animation);
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
          changeSize={this.changeBarWidth}
          changeSpeed={this.changeSortSpeed}
          arrayMax={this.max_n_bars}
          speedMax={this.max_speed}
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
