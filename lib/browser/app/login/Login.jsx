import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Login.styl';
import { login } from './authService';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleLogin = () => {
    login()
      .then(() => {
        this.props.history.push('/buzzer');
      });
  }

  render() {
    return (
      <div className="Login">
        <Button onClick={this.handleLogin} bsStyle="default" bsSize="large">Login</Button>
      </div>
    );
  }
}
