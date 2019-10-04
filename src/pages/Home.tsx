import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchUpcomingEvent } from 'actions/firebase';
import { DataStates } from 'constants/dataStates';
import { State } from 'typings/state';

interface HomePageProps {
  event: {
    publish: boolean;
    image: string;
    text: string;
    link?: string;
  };
  dataState: string;
  fetchEvent: () => void;
}

class HomePage extends Component<HomePageProps> {
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

function mapStateToProps(state: State.AppState) {
  return {
    event: state.upcoming.event,
    dataState: state.upcoming.dataState
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchEvent: () => dispatch<any>(fetchUpcomingEvent())
  };
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default Home;
