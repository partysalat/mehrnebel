import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import './CreateFogButton.styl';

class CreateFogButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
    this.createFog = this.createFog.bind(this);
    this.createFogEnd = this.createFogEnd.bind(this);
    this.createFogSimple = this.createFogSimple.bind(this);
  }
  setPressed(value) {
    this.setState({ isPressed: value });
  }
  createFog() {
    this.setPressed(true);
    this.props.createFog();
  }
  createFogEnd() {
    this.setPressed(false);
    this.props.createFogEnd();
  }
  createFogSimple() {
    this.setPressed(true);
    this.props.createFogSimple();
    setTimeout(() => this.setPressed(false), 200);
  }
  render() {
    return (
      <Hammer
        onPress={this.createFog}
        onPressUp={this.createFogEnd}
        onPanEnd={this.createFogEnd}
        onTap={this.createFogSimple}

      >
        <button className={[
          'push--flat',
          !this.props.enabled && 'disabled',
          this.state.isPressed && 'is-pushed',
        ].join(' ')}
        />
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
