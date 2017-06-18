import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

    if (screenWidth < screenHeight) {
      youtubeWidth = screenWidth - (2 * 20);          // left right padding of 20px
      youtubeHeight = screenWidth / (16 / 9);         // 16:9 aspect ratio
    } else {
      youtubeHeight = screenHeight - 80 - (2 * 20);   // top down padding of 20px and height height
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
    const { video, dataState } = this.props;
    const opts = MusicPage.generateYoutubeOptions();

    if (dataState === DataStates.Fetched) {
      return (
        <div className="music">
          <VisibilitySensor partialVisibility onChange={visible => this.handlePlayerPlayback(visible)}>
            <Youtube videoId={video} opts={opts} onReady={event => this.setState({ player: event.target })} />
          </VisibilitySensor>
        </div>
      );
    }
    return <div className="music" />;
  }
}

MusicPage.propTypes = {
  video: PropTypes.string.isRequired,
  dataState: PropTypes.string.isRequired,
  fetchVideo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    video: state.music.video,
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
