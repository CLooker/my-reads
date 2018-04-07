import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App2 from './components/App2';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route component={App2} />
  </BrowserRouter>,
  document.getElementById('root')
);
