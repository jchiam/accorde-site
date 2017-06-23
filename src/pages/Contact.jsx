import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageLoader from 'components/PageLoader';
import { fetchContactUs } from 'actions/firebase';
import DataStates from 'constants/dataStates';

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
