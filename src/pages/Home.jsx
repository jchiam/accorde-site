import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageLoader from 'components/PageLoader';
import { fetchUpcomingEvent } from 'actions/firebase';
import DataStates from 'constants/dataStates';

class HomePage extends Component {
  componentDidMount() {
    const { fetchEvent } = this.props;
    fetchEvent();
  }

  renderUpcomingEvents() {
    const { event } = this.props;
    if (event) {
      return (
        <div className="upcoming-event">
          <img className="event-image" src={event.image} alt="event" />
          <div className="details">
            <div dangerouslySetInnerHTML={{ __html: event.text }} />
            <button className="button" onClick={() => window.open(event.link)}>FIND OUT MORE</button>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    const { dataState } = this.props;
    return (
      <div className="home">
        <div className="container">
          <img className="logo" src={process.env.LOGO} alt="logo" />
        </div>
        <PageLoader className="loader" loaded={dataState === DataStates.Fetched}>
          <div className="container">{this.renderUpcomingEvents()}</div>
        </PageLoader>
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
