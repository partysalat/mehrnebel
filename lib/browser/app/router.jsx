import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Login from './login/Login';
import Buzzer from './buzzer/Buzzer';
import ProtectedRoute from './components/ProtectedRoute';


export default () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Public Page</Link></li>
        <li><Link to="/buzzer">Buzzer</Link></li>
      </ul>
      <Route exact path="/" component={Login} />
      <ProtectedRoute exact path="/buzzer" component={Buzzer} />
    </div>
  </Router>);
