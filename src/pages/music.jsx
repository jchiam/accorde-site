import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import Youtube from 'react-youtube';

import { fetchRandomVideo } from 'actions/youtube';
import DataStates from 'constants/dataStates';

const YOUTUBE_ASPECT_RATIO = 16 / 9;

class MusicPage extends Component {
  static generateYoutubeOptions() {
    const headerHeight = 80;
    const screenWidth = window.innerWidth - 100;                    // remove 100px as padding buffer
    const screenHeight = window.innerHeight - headerHeight - 100;   // remove 100px as padding buffer
    const screenAspectRatio = screenWidth / screenHeight;

    let youtubeWidth;
    let youtubeHeight;

    // height dependent
    if (screenAspectRatio > YOUTUBE_ASPECT_RATIO) {
      youtubeHeight = screenHeight;
      youtubeWidth = youtubeHeight * YOUTUBE_ASPECT_RATIO;
    // width dependent
    } else {
      youtubeWidth = screenWidth;
      youtubeHeight = screenWidth / YOUTUBE_ASPECT_RATIO;
    }

    return {
      height: youtubeHeight,
      width: youtubeWidth,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        color: 'white',
        rel: 0,
        showinfo: 0
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = { player: null };
  }

  componentDidMount() {
    const { fetchVideo } = this.props;
    fetchVideo();
  }

  handlePlayerPlayback(visible) {
    const { player } = this.state;
    if (player) {
      if (visible) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }

  render() {
    const { video, title, dataState } = this.props;
    const opts = MusicPage.generateYoutubeOptions();

    if (dataState === DataStates.Fetched) {
      return (
        <div className="music">
          <div>
            <div className="player-title">{title}</div>
            <VisibilitySensor partialVisibility onChange={visible => this.handlePlayerPlayback(visible)}>
              <Youtube videoId={video} opts={opts} onReady={event => this.setState({ player: event.target })} />
            </VisibilitySensor>
            <div className="player-more-info">
              <button onClick={() => window.open(process.env.YOUTUBE_CHANNEL)}>Find more at</button>
            </div>
          </div>
        </div>
      );
    }
    return <div className="music" />;
  }
}

MusicPage.propTypes = {
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataState: PropTypes.string.isRequired,
  fetchVideo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    video: state.music.video,
    title: state.music.title,
    dataState: state.music.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVideo: () => dispatch(fetchRandomVideo())
  };
}

const Music = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage);
export default Music;
