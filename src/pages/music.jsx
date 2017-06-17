import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import Youtube from 'react-youtube';

import { fetchRandomVideo } from 'actions/youtube';
import DataStates from 'constants/dataStates';

class MusicPage extends Component {
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
    const screenWidth = window.innerWidth - (2 * 20); // left right padding of 20px
    const screenHeight = screenWidth / (16 / 9);      // 16:9 aspect ratio
    const opts = {
      height: screenHeight,
      width: screenWidth,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        color: 'white',
        rel: 0,
        showinfo: 0
      }
    };

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
