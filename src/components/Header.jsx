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
      <div className="header">
        {Header.renderHeaderButton('home', 'Home')}
        {Header.renderHeaderButton('about', 'About')}
        {Header.renderHeaderButton('music', 'Music')}
        {Header.renderHeaderButton('gallery', 'Gallery')}
        {Header.renderHeaderButton('contact', 'Contact')}
      </div>
    );
  }
}
