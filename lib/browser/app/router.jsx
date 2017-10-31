import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './login/Login';
import Buzzer from './buzzer/Buzzer';


export default () => (
  <Router>
    <div>
      <h1 className="headline">Mehr Nebel!</h1>
      <Route exact path="/" component={Login} />
      <Route exact path="/buzzer" component={Buzzer} />
    </div>
  </Router>);
