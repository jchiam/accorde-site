import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from 'store';
import routes from 'routes';

import 'styles/stylesheet.scss';

if (module.hot) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={createBrowserHistory()} key={Math.random()}>{routes}</Router>
      </Provider>
    </AppContainer>,
    document.getElementById('accorde-root')
  );
  module.hot.accept();
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={createBrowserHistory()}>{routes}</Router>
    </Provider>,
    document.getElementById('accorde-root')
  );
}