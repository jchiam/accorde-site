import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import Youtube from 'react-youtube';

import { fetchRandomVideo } from 'actions/youtube';
import DataStates from 'constants/dataStates';

class MusicPage extends Component {
  static generateYoutubeOptions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let youtubeWidth;
    let youtubeHeight;

    if (screenWidth / (16 / 9) < screenWidth) {
      youtubeWidth = screenWidth - (2 * 50);          // left right padding of 50px
      youtubeHeight = screenWidth / (16 / 9);         // 16:9 aspect ratio
    } else {
      youtubeHeight = screenHeight - 80 - (2 * 50);   // top down padding of 50px and height height
      youtubeWidth = screenHeight / (9 / 16);         // 16:9 aspect ratio
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
