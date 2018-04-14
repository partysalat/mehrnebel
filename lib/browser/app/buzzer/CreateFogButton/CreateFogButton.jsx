import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import './CreateFogButton.styl';

function CreateFogButton(props) {
  return (
    <Hammer
      onPress={props.createFog}
      onPressUp={props.createFogEnd}
      onPanEnd={props.createFogEnd}
      onTap={props.createFogSimple}
    >
      <button className="push--flat" />
    </Hammer>
  );
}

CreateFogButton.propTypes = {
  createFog: PropTypes.func.isRequired,
  createFogEnd: PropTypes.func.isRequired,
  createFogSimple: PropTypes.func.isRequired,
};

export default CreateFogButton;
