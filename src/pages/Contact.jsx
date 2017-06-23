import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageLoader from 'components/PageLoader';
import { fetchContactUs } from 'actions/firebase';
import DataStates from 'constants/dataStates';
import FacebookIcon from 'images/facebook-round.svg';
import YoutubeIcon from 'images/youtube-round.svg';

class ContactPage extends Component {
  componentDidMount() {
    const { fetchContact } = this.props;
    fetchContact();
  }

  render() {
    const { photo, dataState } = this.props;
    return (
      <div className="contact">
        <PageLoader loaded={dataState === DataStates.Fetched}>
          <div className="container">
            <div className="contact-info">
              <p>GET IN TOUCH</p>
              <p>accordeguitar@gmail.com</p>
              <FacebookIcon className="contact-icon" onClick={() => window.open(process.env.FACEBOOK_PAGE)} />
              <YoutubeIcon onClick={() => window.open(process.env.YOUTUBE_CHANNEL)} />
            </div>
            <div className="contact-photo" style={{ backgroundImage: `url(${photo})` }} />
          </div>
        </PageLoader>
      </div>
    );
  }
}

ContactPage.propTypes = {
  photo: PropTypes.string.isRequired,
  dataState: PropTypes.string.isRequired,
  fetchContact: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    photo: state.contact.photo,
    dataState: state.contact.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContact: () => dispatch(fetchContactUs())
  };
}

const Contact = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage);
export default Contact;
