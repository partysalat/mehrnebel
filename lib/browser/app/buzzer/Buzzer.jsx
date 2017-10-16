import React, { Component } from 'react';
import './Buzzer.styl';

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
      <div>BUZZER</div>
    );
  }
}
