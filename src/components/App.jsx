import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        {this.props.children}
      </Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};
