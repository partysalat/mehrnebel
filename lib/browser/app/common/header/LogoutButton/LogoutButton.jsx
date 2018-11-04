import * as React from 'react';
import './LogoutButton.styl';

// TODO: use redux for that
import { logout } from '../../../login/authService';

export default function () {
  return (
    <div className="fa fa-power-off logout-button" aria-hidden="true" onClick={() => logout()} />
  );
}
