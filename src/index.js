/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension, react/no-children-prop */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import store from 'store';
import routes from 'routes';

import 'styles/stylesheet.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={createBrowserHistory()} />
  </Provider>,
  document.getElementById('accorde-root')
);
