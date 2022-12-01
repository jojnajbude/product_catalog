import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './style.scss';
import { App } from './main/App';
import {
  HashRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

