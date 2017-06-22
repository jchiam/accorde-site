import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchAboutUs } from 'actions/firebase';
import DataStates from 'constants/dataStates';

class AboutPage extends Component {
  static parseEventDate(date) {
    return moment(date, 'YYYY-MM');
  }

  componentDidMount() {
    const { fetchContents } = this.props;
    fetchContents();
  }

  renderEvents() {
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

  render() {
    const { story, dataState } = this.props;
    if (dataState === DataStates.Fetched) {
      /* eslint-disable react/no-danger */
      return (
        <div className="about">
          <div className="container">
            <div className="story">
              <div>OUR STORY</div>
              <div dangerouslySetInnerHTML={{ __html: story }} />
            </div>
          </div>
          <div className="container">
            <div className="events">
              <div className="pane">EVENT HIGHTLIGHTS</div>
              <div className="pane">
                <table className="events-table">
                  <tbody>{this.renderEvents()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
      /* eslint-enable react/no-danger */
    }
    return <div className="story" />;
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
  dataState: PropTypes.string.isRequired,
  fetchContents: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    story: state.about.story,
    events: state.about.events,
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
