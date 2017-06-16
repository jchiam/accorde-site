import React, { Component } from 'react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

import Home from 'pages/home';
import About from 'pages/about';
import Music from 'pages/music';
import Gallery from 'pages/gallery';
import Contact from 'pages/contact';

configureAnchors({ offset: -100 });

export default class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <ScrollableAnchor id="home">
          <Home />
        </ScrollableAnchor>
        <ScrollableAnchor id="about">
          <About />
        </ScrollableAnchor>
        <ScrollableAnchor id="music">
          <Music />
        </ScrollableAnchor>
        <ScrollableAnchor id="gallery">
          <Gallery />
        </ScrollableAnchor>
        <ScrollableAnchor id="contact">
          <Contact />
        </ScrollableAnchor>
      </div>
    );
  }
}
