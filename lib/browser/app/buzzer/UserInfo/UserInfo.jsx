import * as React from 'react';
import Spinner from '../Spinner/Spinner';
import './UserInfo.styl';

export default function (props) {
  const { counter } = (props.user && props.user.stats) || {};
  const username = (props.user && props.user.username);
  const { lastClaimer } = props;
  let userInfo;
  if (counter > -1) {
    userInfo = (
      <div className="user-info">
        <div>Eingelogged als: {username}</div>
        <div>Knopf gedrückt: {counter || 0}x</div>
        <div>Als letztes aktiv : {lastClaimer}</div>
      </div>
    );
  } else {
    userInfo = <Spinner />;
  }
  return userInfo;
}
