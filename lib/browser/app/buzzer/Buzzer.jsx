import React, { Component } from 'react';
import './Buzzer.styl';
import CreateFogButton from './CreateFogButton/CreateFogButton';
import getInstance from './../login/httpService';
import UserInfo from './UserInfo/UserInfo';
import LogoutButton from './LogoutButton/LogoutButton';

export default class Buzzer extends Component {
  static async createFog() {
    const client = await getInstance();
    return client.put('/api/create-fog');
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.initUser();
  }
  async initUser() {
    const client = await getInstance();
    const user = await client.get('/api/user');
    this.setState(currentState => ({ ...currentState, user: user.data.data }));
  }
  createFogAndUpdateState = () => Buzzer.createFog()
    .then((user) => {
      this.setState(currentState => ({ ...currentState, user: user.data.data }));
    })

  render() {
    return (
      <div>
        <LogoutButton />
        <UserInfo user={this.state.user} />
        <CreateFogButton createFog={this.createFogAndUpdateState} />
      </div>
    );
  }
}
