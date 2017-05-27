import React from 'react';
import { Switch, Route } from 'react-router';

import App from 'components/app';
import Home from 'pages/home';
import About from 'pages/about';
import Music from 'pages/music';
import Gallery from 'pages/gallery';
import Contact from 'pages/contact';

export default(
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/music" component={Music} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </App>
);
