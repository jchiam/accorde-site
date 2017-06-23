import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <img className="logo" src={process.env.LOGO} alt="logo" />
      </div>
    );
  }
}
