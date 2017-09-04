import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUpcomingEvent } from 'actions/firebase';
import DataStates from 'constants/dataStates';

class HomePage extends Component {
  static renderHomeLogo() {
    return (
      <div className="container">
        <img className="logo" src={process.env.LOGO} alt="logo" />
      </div>
    );
  }

  componentDidMount() {
    const { fetchEvent } = this.props;
    fetchEvent();
  }

  renderUpcomingEvent() {
    const { event, dataState } = this.props;
    if (dataState === DataStates.Fetched && event && event.publish) {
      /* eslint-disable react/no-danger */
      return (
        <div className="container">
          <div className="upcoming-event">
            <img className="event-image" src={event.image} alt="event" />
            <div className="details">
              <div dangerouslySetInnerHTML={{ __html: event.text }} />
              <button className="button" onClick={() => window.open(event.link)}>FIND OUT MORE</button>
            </div>
          </div>
        </div>
      );
      /* eslint-enable react/no-danger */
    }
    return null;
  }

  render() {
    return (
      <div className="home">
        {HomePage.renderHomeLogo()}
        {this.renderUpcomingEvent()}
      </div>
    );
  }
}

HomePage.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string
  }),
  dataState: PropTypes.string.isRequired,
  fetchEvent: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  event: null
};

function mapStateToProps(state) {
  return {
    event: state.upcoming.event,
    dataState: state.upcoming.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvent: () => dispatch(fetchUpcomingEvent())
  };
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default Home;
