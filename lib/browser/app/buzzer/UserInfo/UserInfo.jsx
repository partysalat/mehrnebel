import * as React from 'react';
import Spinner from '../Spinner/Spinner';
import './UserInfo.styl';

export default function (props) {
  const { counter } = (props.user && props.user.stats) || {};
  const username = (props.user && props.user.username);
  const { lastClaimer } = props;
  if (username) {
    return (
      <div className="user-info">
        <div className="user-info-row">Eingelogged als: {username}</div>
        <div className="user-info-row">Knopf gedrückt: {counter || 0}x</div>
        <div className="user-info-row">Als letztes aktiv: {lastClaimer}</div>
      </div>
    );
  }
  return <Spinner />;
}
