import React, { Component } from 'react';
import Scroll from 'react-scroll';

const SCROLL_OFFSET = -60;

export default class Header extends Component {
  static renderHeaderButton(anchor, label) {
    return (
      <Scroll.Link
        className="header-button"
        activeClass="header-button-selected"
        to={anchor}
        offset={SCROLL_OFFSET}
        spy
        smooth
        isDynamic
      >
        {label}
      </Scroll.Link>
    );
  }

  render() {
    return (
      <div className="header-container">
        <div className="header">
          {Header.renderHeaderButton('home', 'HOME')}
          {Header.renderHeaderButton('about', 'ABOUT')}
          {Header.renderHeaderButton('music', 'MUSIC')}
          {Header.renderHeaderButton('gallery', 'GALLERY')}
          {Header.renderHeaderButton('contact', 'CONTACT')}
        </div>
      </div>
    );
  }
}
