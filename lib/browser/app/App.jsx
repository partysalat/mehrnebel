import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './router';
import './App.styl';

function App() {
  return (
    <div className="App container">
      <Routes />
    </div>
  );
}

export default withRouter(App);
