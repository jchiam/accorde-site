import React, { Component } from 'react';
import Mailto from 'react-mailto';

import YoutubeIcon from 'images/youtube-icon.svg';
import FacebookIcon from 'images/facebook-icon.svg';
import EmailIcon from 'images/email-icon.svg';

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="title">GET IN TOUCH!</div>
        <div className="social-media-container">
          <div className="social-media">
            <YoutubeIcon className="social-media-icon" onClick={() => window.open(process.env.YOUTUBE_CHANNEL)} />
            Visit Our<br />Youtube Channel
          </div>
          <div className="social-media">
            <FacebookIcon className="social-media-icon" onClick={() => window.open(process.env.FACEBOOK_PAGE)} />
            Visit Our<br />Facebook Page
          </div>
          <div className="social-media">
            <Mailto email={process.env.EMAIL} obfuscate>
              <EmailIcon className="social-media-icon" />
            </Mailto>
            Email Us!
          </div>
        </div>
        <div className="footer">Recruitment // Engagement // Outreach</div>
      </div>
    );
  }
}
