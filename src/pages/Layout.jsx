import React, { Component } from 'react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

import Home from 'pages/Home';
import About from 'pages/About';
import Music from 'pages/Music';
import Gallery from 'pages/Gallery';
import Contact from 'pages/Contact';

configureAnchors({ offset: -60 });

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
