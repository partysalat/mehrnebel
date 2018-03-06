import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import './CreateFogButton.styl';

class CreateFogButton extends Component {
  render() {
    return (
      <Hammer
        onPress={this.props.createFog}
        onPressUp={this.props.createFogEnd}
        onPanEnd={this.props.createFogEnd}
        onTap={this.props.createFogSimple}
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
