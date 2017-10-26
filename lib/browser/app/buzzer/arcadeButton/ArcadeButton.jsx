import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import './ArcadeButton.styl';


export default class ArcadeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }
  handleOnPressUp= (args) => {
    console.log('ON PRESS UP', args);
  }
  handleOnTap= (args) => {
    console.log('ON TAP', args);
  }
  handleOnPress= (args) => {
    console.log('ON PRESS', args);
  }
  render() {
    const className = this.state.pressed ? 'is-pushed' : '';
    return (
      <Hammer
        onPress={this.handleOnPress}
        onPressUp={this.handleOnPressUp}
        onTap={this.handleOnTap}
      >
        <button className={`push--flat ${className}`} />
      </Hammer>
    );
  }
}
