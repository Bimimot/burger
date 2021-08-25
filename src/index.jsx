import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/app';
import ErrorBoundary from './components/error-boundary/error-boundary';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
