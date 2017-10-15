import React, { Component } from 'react';
import './Login.styl';
import { login } from './authService';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // auth: login(),
    };
  }

  handleLogin= () => {
    login();
  }

  render() {
    return (
      <div className="Login">
        <button onClick={this.handleLogin} >Login</button>
      </div>
    );
  }
}
