import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MenuPower from './menuPower';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <MenuPower />
  </React.StrictMode>,
  document.getElementById('menu')
);

