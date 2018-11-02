import React from 'react';
import './ClaimMutexButton.styl';


export default function ClaimMutexButton(props) {
  return (
    <div className="claim-mutex-button">
      <label className="switch">
        <input type="checkbox" onClick={props.onClick} className={props.isChecked && 'checked'} />
        <span className="slider round" />
      </label>
    </div>
  );
}


