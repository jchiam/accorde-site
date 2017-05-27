import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Header extends Component {
  navigateTo(path) {
    const { history } = this.props;
    return () => history.push(path);
  }

  render() {
    return (
      <div className="header">
        <div>logo here</div>
        <button onClick={this.navigateTo('/')}>Home</button>
        <button onClick={this.navigateTo('/about')}>About</button>
        <button onClick={this.navigateTo('/music')}>Music</button>
        <button onClick={this.navigateTo('/gallery')}>Gallery</button>
        <button onClick={this.navigateTo('/contact')}>Contact</button>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired  // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Header);
