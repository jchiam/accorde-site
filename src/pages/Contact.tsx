import React, { Component } from 'react';

export default class Contact extends Component {
  renderYoutubeButton() {
    return (
      <div className="social-media">
        <button
          className="social-media-icon"
          onClick={() => window.open(process.env.YOUTUBE_CHANNEL)}
        >
          <img src={require('images/youtube-contact.svg')} />
        </button>
        Visit Our<br />Youtube Channel
      </div>
    );
  }

  renderFacebookButton() {
    return (
      <div className="social-media">
        <button
          className="social-media-icon"
          onClick={() => window.open(process.env.FACEBOOK_PAGE)}
        >
          <img src={require('images/facebook-contact.svg')} />
        </button>
        Visit Our<br />Facebook Page
      </div>
    );
  }

  renderEmailButton() {
    return (
      <div className="social-media">
        <a className="social-media-icon" href={`mailto:${process.env.EMAIL}`}>
          <img src={require('images/email-contact.svg')} />
        </a>
        Email Us!
      </div>
    );
  }

  render() {
    return (
      <div className="contact">
        <div className="title">GET IN TOUCH!</div>
        <div className="social-media-container">
          {this.renderYoutubeButton()}
          {this.renderFacebookButton()}
          {this.renderEmailButton()}
        </div>
        <div className="footer">Recruitment // Engagement // Outreach</div>
      </div>
    );
  }
}
