import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/app';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './services/index';

import { socketMiddleware } from './services/middleware/socketMidlware';
import { getCookie } from './utils/helpers';

const wsUrlFeed = 'wss://norma.nomoreparties.space/orders/all';

const wsActionsFeed = {
  wsInit: "wsFeed/wsInit",
  onOpen: "wsFeed/wsSuccess",
  onClose: "wsFeed/wsClosed",
  onError: "wsFeed/wsError",
  onMessage: "wsFeed/wsGetFeed"
};

const wsUrlOrders = "wss://norma.nomoreparties.space/orders?token=" + getCookie('accessToken');

const wsActionsOrders = {
  wsInit: "wsOrders/wsInit",
  onOpen: "wsOrders/wsSuccess",
  onClose: "wsOrders/wsClosed",
  onError: "wsOrders/wsError",
  onMessage: "wsOrders/wsGetOrders"
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        logger,
        socketMiddleware(wsUrlFeed, wsActionsFeed),
        socketMiddleware(wsUrlOrders, wsActionsOrders)
      ),
  devTools: process.env.NODE_ENV !== 'production'
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
