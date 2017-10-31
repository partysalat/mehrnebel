import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './router';
import './App.styl';

// import { authUser, signOutUser } from "./libs/awsLib";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: false,
    };
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
