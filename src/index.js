import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <BrowserRouter>
     <App />
   </BrowserRouter>
   , document.getElementById('root'));
registerServiceWorker();
