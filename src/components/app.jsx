import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/header';

const HEADER_STATES = {
  HOME: 'home',
  ABOUT: 'about',
  MUSIC: 'music',
  GALLERY: 'gallery',
  CONTACT: 'contact'
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { header: HEADER_STATES.HOME };
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};
