import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import PageLoader from 'components/PageLoader';
import { fetchAboutUs } from 'actions/firebase';
import { generateImageUrl } from 'utils';
import DataStates from 'constants/dataStates';

class AboutPage extends Component {
  static parseEventDate(date) {
    return moment(date, 'YYYY-MM');
  }

  componentDidMount() {
    const { fetchContents } = this.props;
    fetchContents();
  }

  renderStory() {
    const { story, photos } = this.props;
    const storyPhoto = generateImageUrl(photos.story, 'q_40');
    /* eslint-disable react/no-danger */
    return (
      <div className="container" style={{ backgroundImage: `url(${storyPhoto})` }}>
        <div className="story" >
          <div className="about-title">OUR STORY</div>
          <div dangerouslySetInnerHTML={{ __html: story }} />
        </div>
      </div>
    );
    /* eslint-enable react/no-danger */
  }

  renderEventsTable() {
    const { events } = this.props;
    const eventRows = [];

    Object.keys(events).forEach((date) => {
      const dateEvents = events[date];
      const parsedDate = AboutPage.parseEventDate(date);
      dateEvents.forEach(event =>
        eventRows.push(
          <tr key={JSON.stringify(event)}>
            <td className="event-cell">
              <div className="event-month">{parsedDate.format('MMM').toUpperCase()}</div>
              <div className="event-year">{parsedDate.format('YYYY')}</div>
            </td>
            <td className="event-cell">
              <div className="event-name">{event.name}</div>
              <div>{event.sub || null}</div>
            </td>
          </tr>
        )
      );
    });

    return eventRows;
  }

  renderEvents() {
    const { photos } = this.props;
    const eventsPhoto = generateImageUrl(photos.events, 'q_40');
    return (
      <div className="container" style={{ backgroundImage: `url(${eventsPhoto})` }}>
        <div className="events">
          <div className="pane about-title">EVENT HIGHTLIGHTS</div>
          <div className="pane">
            <table className="events-table">
              <tbody>{this.renderEventsTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { dataState } = this.props;
    return (
      <div className="about">
        <PageLoader loaded={dataState === DataStates.Fetched}>
          {this.renderStory()}
        </PageLoader>
        <PageLoader loaded={dataState === DataStates.Fetched}>
          {this.renderEvents()}
        </PageLoader>
      </div>
    );
  }
}

AboutPage.propTypes = {
  story: PropTypes.string.isRequired,
  events: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      sub: PropTypes.string
    }))
  ).isRequired,
  photos: PropTypes.shape({
    story: PropTypes.string,
    events: PropTypes.string
  }).isRequired,
  dataState: PropTypes.string.isRequired,
  fetchContents: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    story: state.about.story,
    events: state.about.events,
    photos: state.about.photos,
    dataState: state.about.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContents: () => dispatch(fetchAboutUs())
  };
}

const About = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
export default About;
