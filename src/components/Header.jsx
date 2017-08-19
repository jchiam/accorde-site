import React, { Component } from 'react';
import classNames from 'classnames';
import { goToAnchor, removeHash } from 'react-scrollable-anchor';

const HEADER_STATES = {
  HOME: 'home',
  ABOUT: 'about',
  MUSIC: 'music',
  GALLERY: 'gallery',
  CONTACT: 'contact'
};

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { header: '' };
    this.onHashChange = this.handleHashChange.bind(this);
  }

  componentWillMount() {
    this.setState({ header: window.location.hash ? window.location.hash.substring(1) : HEADER_STATES.HOME });
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  handleHashChange() {
    this.setState({ header: window.location.hash.substring(1) });
  }

  renderHeaderButton(anchor, label) {
    const { header } = this.state;
    return (
      <button
        className={classNames({
          'header-button': true,
          'header-button-selected': header === anchor
        })}
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
          {this.renderHeaderButton('home', 'HOME')}
          {this.renderHeaderButton('about', 'ABOUT')}
          {this.renderHeaderButton('music', 'MUSIC')}
          {this.renderHeaderButton('gallery', 'GALLERY')}
          {this.renderHeaderButton('contact', 'CONTACT')}
        </div>
      </div>
    );
  }
}
