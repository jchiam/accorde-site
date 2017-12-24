import React, { Component } from 'react';
import Scroll from 'react-scroll';

import Home from 'pages/Home';
import About from 'pages/About';
import Music from 'pages/Music';
import Gallery from 'pages/Gallery';
import Contact from 'pages/Contact';

const { Element } = Scroll;
const scroll = Scroll.animateScroll;

export default class Layout extends Component {
  componentDidMount() {
    scroll.scrollTo(0); // set initial scroll position to top
  }

  render() {
    return (
      <div className="layout">
        <Element name="home">
          <Home />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <Element name="music">
          <Music />
        </Element>
        <Element name="gallery">
          <Gallery />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
      </div>
    );
  }
}
