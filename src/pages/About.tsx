import React, { Component } from 'react';
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

class AboutPage extends Component<AboutPageProps> {
  static parseEventDate(date: string) {
    const tokenisedDate = date.split('-');
    if (tokenisedDate.length === 2) {
      return {
        year: tokenisedDate[0].toString(),
        month: Months[parseInt(tokenisedDate[1], 10) - 1].toUpperCase()
      };
    }
    return null;
  }

  static navigateToLink(link?: string) {
    if (link) {
      window.open(link);
    }
  }

  static renderEvent(event: Models.Event, date: Nullable<ParsedDate>) {
    return (
      <tr key={JSON.stringify(event)} onClick={() => AboutPage.navigateToLink(event.link)}>
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
  }

  componentDidMount() {
    const { fetchContents } = this.props;
    fetchContents();
  }

  renderStory() {
    const { story, photos, dataState } = this.props;
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
  }

  renderEventsTable() {
    const { events } = this.props;
    const eventRows: Array<JSX.Element> = [];

    Object.keys(events).forEach((date) => {
      const dateEvents = events[date];
      const parsedDate = AboutPage.parseEventDate(date);
      dateEvents.forEach(event => eventRows.push(AboutPage.renderEvent(event, parsedDate)));
    });
    return eventRows;
  }

  renderEvents() {
    const { photos, dataState } = this.props;
    const eventsPhoto = generateImageUrl(photos.events, 'w_1000');

    if (dataState === DataStates.Error) {
      return <div className="container">{ABOUT_US_ERROR_MESSAGE}</div>;
    }

    return (
      <div className="container" style={{ backgroundImage: `url(${eventsPhoto})` }}>
        <div className="events">
          <div className="about-title">EVENT HIGHLIGHTS</div>
          <table className="events-table">
            <tbody>{this.renderEventsTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    const { dataState } = this.props;
    return (
      <div className="about">
        <PageLoader loaded={dataState !== DataStates.Fetching}>
          {this.renderStory()}
        </PageLoader>
        <PageLoader loaded={dataState !== DataStates.Fetching}>
          {this.renderEvents()}
        </PageLoader>
      </div>
    );
  }
}

function mapStateToProps(state: State.AppState) {
  return {
    story: state.about.story,
    events: state.about.events,
    photos: state.about.photos,
    dataState: state.about.dataState
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchContents: () => dispatch<any>(fetchAboutUs())
  };
}

const About = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
export default About;
