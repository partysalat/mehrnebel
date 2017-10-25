import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Login from './login/Login';
import Buzzer from './buzzer/Buzzer';


export default ({ childProps }) => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Public Page</Link></li>
        <li><Link to="/buzzer">Buzzer</Link></li>
      </ul>
      <Route exact path="/" component={Login} />
      <Route exact path="/buzzer" component={Buzzer} />
    </div>
  </Router>);
