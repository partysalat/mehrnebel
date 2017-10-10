import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/Route';

import Login from './login/Login';
import Signup from './signup/Signup';

export default ({ childProps }) =>
  <Switch>

    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
  </Switch>;
