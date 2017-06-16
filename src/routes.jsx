import React from 'react';
import { Switch, Route } from 'react-router';

import App from 'components/app';
import Layout from 'pages/layout';

export default(
  <App>
    <Switch>
      <Route path="/" component={Layout} />
    </Switch>
  </App>
);
