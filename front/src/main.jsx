import React from 'react';
import ReactDOM from 'react-dom/client';
import Routering from './Routes/routes';
import Modal from 'react-modal';

Modal.setAppElement('#root');

import "./main.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routering />
  </React.StrictMode>
);