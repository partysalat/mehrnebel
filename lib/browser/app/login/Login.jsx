import React, { Component } from 'react';
import './Login.styl';
import { login } from './authService';
import getInstance from './httpService';

async function createFog() {
  const axios = await getInstance();
  return axios.get('/create-fog').then((res) => {
    console.log(res.data);
  });
}

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
        <button onClick={createFog} >MakeRequest</button>
      </div>
    );
  }
}
