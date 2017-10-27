import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import './CreateFogButton.styl';


class CreateFogButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      timeout: null,
    };
  }
  reset() {
    clearTimeout(this.state.timeout);
    this.setState(currentState => ({ ...currentState, pressed: false }));
  }

  handleOnPressUp= () => {
    this.reset();
  }
  handleOnPress= () => {
    this.reset();
    this.props.createFog();
    this.setState((currentState) => {
      const timeout = setTimeout(() => { this.handleOnPress(); }, 1000);
      return { ...currentState, timeout, pressed: true };
    });
  }
  handleOnTap= () => {
    this.props.createFog();
    this.reset();
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

CreateFogButton.propTypes = {
  createFog: PropTypes.func.isRequired,
};
export default CreateFogButton;
