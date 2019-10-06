import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import PageLoader from 'components/PageLoader';
import { fetchAboutUs } from 'actions/firebase';
import { generateImageUrl } from 'utils';
import Months from 'constants/dates';
import { DataStates } from 'constants/dataStates';
import { Models } from 'typings/models';
import { State } from 'typings/state';

const ABOUT_US_ERROR_MESSAGE = 'There seems to be an error. Please refresh or try again later.';

interface ParsedDate {
  year: string;
  month: string;
}

interface AboutPageProps {
  story: string;
  events: { [key: string]: Array<Models.Event> };
  photos: {
    story: string;
    events: string;
  };
  dataState: string;
  fetchContents: () => void;
}

const AboutPage = (props: AboutPageProps) => {
  const { story, events, photos, dataState, fetchContents } = props;

  useEffect(() => { fetchContents(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  const navigateToLink = (link?: string) => {
    if (link) {
      window.open(link);
    }
  };

  const parseEventDate = (date: string) => {
    const tokenisedDate = date.split('-');
    if (tokenisedDate.length === 2) {
      return {
        year: tokenisedDate[0].toString(),
        month: Months[parseInt(tokenisedDate[1], 10) - 1].toUpperCase()
      };
    }
    return null;
  };

  const renderEvent = (event: Models.Event, date: Nullable<ParsedDate>) => (
    <tr key={JSON.stringify(event)} onClick={() => navigateToLink(event.link)}>
      <td className="event-cell">
        <div className="event-month">{date ? date.month : ''}</div>
        <div className="event-year">{date ? date.year : ''}</div>
      </td>
      <td className="event-cell">
        <div className="event-name">{event.name}</div>
        <div className="event-sub">{event.sub}</div>
        <div className="event-more">{'Find out more >>'}</div>
      </td>
    </tr>
  );

  const renderStory = () => {
    const storyPhoto = generateImageUrl(photos.story, 'w_1000');

    if (dataState === DataStates.Error) {
      return <div className="container">{ABOUT_US_ERROR_MESSAGE}</div>;
    }

    return (
      <div className="container" style={{ backgroundImage: `url(${storyPhoto})` }}>
        <div className="story" >
          <div className="about-title">OUR STORY</div>
          <div dangerouslySetInnerHTML={{ __html: story }} />
        </div>
      </div>
    );
  };

  const renderEventsTable = () => {
    const eventRows: Array<JSX.Element> = [];

    Object.keys(events).forEach((date) => {
      const dateEvents = events[date];
      dateEvents.forEach(event => eventRows.push(renderEvent(event, parseEventDate(date))));
    });
    return eventRows;
  };

  const renderEvents = () => {
    const eventsPhoto = generateImageUrl(photos.events, 'w_1000');

    if (dataState === DataStates.Error) {
      return <div className="container">{ABOUT_US_ERROR_MESSAGE}</div>;
    }

    return (
      <div className="container" style={{ backgroundImage: `url(${eventsPhoto})` }}>
        <div className="events">
          <div className="about-title">EVENT HIGHLIGHTS</div>
          <table className="events-table">
            <tbody>{renderEventsTable()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="about">
      <PageLoader loaded={dataState !== DataStates.Fetching}>
        {renderStory()}
      </PageLoader>
      <PageLoader loaded={dataState !== DataStates.Fetching}>
        {renderEvents()}
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state: State.AppState) => ({
  story: state.about.story,
  events: state.about.events,
  photos: state.about.photos,
  dataState: state.about.dataState
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchContents: () => dispatch<any>(fetchAboutUs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
