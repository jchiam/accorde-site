import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
      </>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};
