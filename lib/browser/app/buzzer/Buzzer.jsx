import React, { Component } from 'react';
import './Buzzer.styl';
import ArcadeButton from './arcadeButton/ArcadeButton';

export default class Buzzer extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleConfirmationSubmit(event) {
    event.preventDefault();
    confirm(this.state.newUser, this.state.confirmationCode).then(() => {
      this.setState({ isLoading: true });
    });
  }

  render() {
    return (
      <div>
        <ArcadeButton />
      </div>
    );
  }
}
