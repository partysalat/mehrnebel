import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './components/Route';

import Login from './login/Login';
import Buzzer from './buzzer/Buzzer';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/buzzer" exact component={Buzzer} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
  </Switch>);
