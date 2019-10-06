import React from 'react';
import { Switch, Route } from 'react-router';

import App from 'components/App';
import Layout from 'pages/Layout';

export default (
  <App>
    <Switch>
      <Route path="/" component={Layout} />
    </Switch>
  </App>
);
