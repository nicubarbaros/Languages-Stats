import React from 'react';
import ReactDOM from 'react-dom';

require('./index.css');

import App from './components/App';

ReactDOM.render(
  <App name="Nick"/>,
  document.getElementById('app')
);