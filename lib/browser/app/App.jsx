import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './router';
import './App.styl';
class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="App container">
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
