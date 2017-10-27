import React, { Component } from 'react';
import './Buzzer.styl';
import CreateFogButton from './createFogButton/CreateFogButton';
import getInstance from './../login/httpService';

export default class Buzzer extends Component {
  static createFog() {
    return getInstance().get('/create-fog').then((res) => {
      console.log(res.data);
    });
  }

  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <CreateFogButton createFog={Buzzer.createFog} />
      </div>
    );
  }
}
