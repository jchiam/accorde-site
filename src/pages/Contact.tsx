import React from 'react';

const Contact = () => {
  const youtubeButton = (
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

  const facebookButton = (
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

  const emailButton = (
    <div className="social-media">
      <a className="social-media-icon" href={`mailto:${process.env.EMAIL}`}>
        <img src={require('images/email-contact.svg')} />
      </a>
      Email Us!
    </div>
  );

  return (
    <div className="contact">
      <div className="title">GET IN TOUCH!</div>
      <div className="social-media-container">
        {youtubeButton}
        {facebookButton}
        {emailButton}
      </div>
      <div className="footer">Recruitment // Engagement // Outreach</div>
    </div>
  );
};

export default Contact;
