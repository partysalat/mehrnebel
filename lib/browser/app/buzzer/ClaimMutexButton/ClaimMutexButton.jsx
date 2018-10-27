import React from 'react';
import PropTypes from 'prop-types';
import './ClaimMutexButton.styl';


export default function ClaimMutexButton(props) {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" onClick={props.onClick} className={props.isChecked && 'checked'} />
        <span className="slider round" />
      </label>
    </div>
  );
}

