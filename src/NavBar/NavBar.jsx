import React from 'react';
import './NavBar.css';



export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        style:{background:'red', color:'white'},
   };
   
  }


  render() {
    const {whenClicked} = this.props;

    return (<div className="navbar-container"
            style={{
            width: `${window.innerWidth}px`,
            height: `50px`
    }}><button onClick={whenClicked}>New Array</button>
      </div>)
  };


};
