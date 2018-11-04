import * as React from 'react';
import Spinner from '../../common/Spinner/Spinner';
import './UserInfo.styl';

export default function (props) {
  const { buzzerClicked } = (props.user && props.user.stats) || {};
  const username = (props.user && props.user.username);
  const { lastClaimer, isClaimPending } = props;
  if (!username) {
    return <Spinner />;
  }
  return (
    <div className="user-info">
      <div className="user-info-row">Eingelogged als: {username}</div>
      <div className="user-info-row">Knopf gedrückt: {buzzerClicked || 0}x</div>
      <div className="user-info-row">
          Als letztes aktiv: {isClaimPending ? <Spinner mode="inline" /> : lastClaimer}
      </div>
    </div>
  );
}
