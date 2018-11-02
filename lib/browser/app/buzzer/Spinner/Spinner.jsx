
import * as React from 'react';
import './Spinner.styl';

export default function (props) {
  const { mode } = props;
  const isInline = mode === 'inline';
  return (
    isInline ? <div className="sp sp-wave spinner-inline" /> : <div className="sp sp-wave" />
  );
}
