import React, { Component } from 'react';
import { goToAnchor } from 'react-scrollable-anchor';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <button onClick={() => goToAnchor('home')}>Home</button>
        <button onClick={() => goToAnchor('about')}>About</button>
        <button onClick={() => goToAnchor('music')}>Music</button>
        <button onClick={() => goToAnchor('gallery')}>Gallery</button>
        <button onClick={() => goToAnchor('contact')}>Contact</button>
      </div>
    );
  }
}
