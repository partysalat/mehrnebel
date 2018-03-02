import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';


import App from './app/App';
import getStore from './redux';
import './main.styl';


render(
  <Provider store={getStore()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

