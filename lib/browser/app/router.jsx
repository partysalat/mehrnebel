import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './login/Login';
import Buzzer from './buzzer/Buzzer';
import Stats from './stats';


export default () => (
  <Router>
    <div>
      <h1 className="headline">Mehr Nebel!</h1>
      <Route exact path="/" component={Login} />
      <Route exact path="/buzzer" component={Buzzer} />
      <Route exact path="/stats" component={Stats} />
    </div>
  </Router>);
