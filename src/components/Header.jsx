import React, { Component } from 'react';
import { goToAnchor, removeHash } from 'react-scrollable-anchor';

export default class Header extends Component {
  static renderHeaderButton(anchor, label) {
    return (
      <button
        className="header-button"
        onClick={() => { removeHash(); goToAnchor(anchor); }}
      >
        {label}
      </button>
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
