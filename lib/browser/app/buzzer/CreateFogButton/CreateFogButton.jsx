import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import './CreateFogButton.styl';


class CreateFogButton extends Component {
  handleOnPressUp= () => {
    this.props.createFogEnd();
  }
  handleOnPress = async () => {
    this.props.createFog();
  }
  handleOnTap= () => {
    this.props.createFogSimple();
  }

  render() {
    // const className = this.state.pressed ? 'is-pushed' : '';
    return (
      <Hammer
        onPress={this.handleOnPress}
        onPressUp={this.handleOnPressUp}
        onPanEnd={this.handleOnPressUp}
        onTap={this.handleOnTap}
      >
        <button className="push--flat" />
      </Hammer>
    );
  }
}

CreateFogButton.propTypes = {
  createFog: PropTypes.func.isRequired,
  createFogEnd: PropTypes.func.isRequired,
  createFogSimple: PropTypes.func.isRequired,
};
export default CreateFogButton;
