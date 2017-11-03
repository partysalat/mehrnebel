import React, { Component } from 'react';
import './Buzzer.styl';
import CreateFogButton from './createFogButton/CreateFogButton';
import getInstance from './../login/httpService';

export default class Buzzer extends Component {
  static async createFog() {
    const client = await getInstance();
    const res = await client.put('/api/create-fog');
    return res;
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.initUser();
  }
  async initUser() {
    const client = await getInstance();
    const user = await client.get('/api/user');
    console.log(user);
    this.setState(currentState => ({ ...currentState, user: user.data.data }));
  }
  createFogAndUpdateState = () => {
    Buzzer.createFog()
      .then((user) => {
        this.setState(currentState => ({ ...currentState, user: user.data.data }));
      });
  }

  render() {
    const user = (this.state.user && this.state.user.stats) || {};
    return (
      <div>
        <div>Eingelogged als: {user.username}</div>
        <div>Knopf gedrückt: {user.counter}x</div>

        <CreateFogButton createFog={this.createFogAndUpdateState} />
      </div>
    );
  }
}
