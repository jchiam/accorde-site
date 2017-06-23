import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';

const LOADER_COLOR = '#4990E2';

export default class PageLoader extends Component {
  render() {
    const { loaded, children } = this.props;
    return (
      <Loader loaded={loaded} position="relative" color={LOADER_COLOR}>
        {children}
      </Loader>
    );
  }
}

PageLoader.propTypes = {
  loaded: PropTypes.bool,
  children: PropTypes.node
};

PageLoader.defaultProps = {
  loaded: true,
  children: null
};
