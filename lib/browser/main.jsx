import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

import './main.styl';


const rootElement = document.getElementById('root');
render(
  <Router>
    <App />
  </Router>,
  rootElement
);

