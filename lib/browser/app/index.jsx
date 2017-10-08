import React, { Component } from 'react';
import Login from './login/Login';
import Signup from './signup/Signup';

export default class App extends Component { //eslint-disable-line
  render() {
    return (
      <div>
        <Login />
        <Signup />
      </div>
    );
  }
}
