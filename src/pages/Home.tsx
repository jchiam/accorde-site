import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchUpcomingEvent } from 'actions/firebase';
import { DataStates } from 'constants/dataStates';
import { Models } from 'typings/models';
import { State } from 'typings/state';

interface HomePageProps {
  event: Models.UpcomingEvent;
  dataState: string;
  fetchEvent: () => void;
}

const HomePage = (props: HomePageProps) => {
  const { event, dataState, fetchEvent } = props;

  useEffect(() => { fetchEvent(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  const homeLogo = (
    <div className="container">
      <img className="logo" src={process.env.LOGO} alt="logo" />
    </div>
  );

  const renderUpcomingEvent = () => {
    if (dataState === DataStates.Fetched && event && event.publish) {
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
    }
    return null;
  }

  return (
    <div className="home">
      {homeLogo}
      {renderUpcomingEvent()}
    </div>
  );
};

const mapStateToProps = (state: State.AppState) => ({
  event: state.upcoming.event,
  dataState: state.upcoming.dataState
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchEvent: () => dispatch<any>(fetchUpcomingEvent())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
