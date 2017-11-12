import * as React from 'react';
import Spinner from '../Spinner/Spinner';

export default function (props) {
  const { counter } = (props.user && props.user.stats) || {};
  const username = (props.user && props.user.username);
  let userInfo;
  if (counter > -1) {
    userInfo = (
      <div>
        <div>Eingelogged als: {username}</div>
        <div>Knopf gedrückt: {counter || 0}x</div>
      </div>
    );
  } else {
    userInfo = <Spinner />;
  }
  return userInfo;
}
