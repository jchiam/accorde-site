import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Youtube from 'react-youtube';

import PageLoader from 'components/PageLoader';
import { fetchRandomVideo } from 'actions/youtube';
import DataStates from 'constants/dataStates';
import YoutubeIcon from 'images/youtube.svg';

const HEADER_BAR_HEIGHT = 80;
const YOUTUBE_ASPECT_RATIO = 16 / 9;

class MusicPage extends Component {
  static generateYoutubeOptions() {
    const headerHeight = 80;
    const screenWidth = window.innerWidth - 200;                    // remove 100px as padding buffer
    const screenHeight = window.innerHeight - headerHeight - 150;   // remove 150px as padding buffer
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
    window.addEventListener('scroll', () => this.handlePlayerPlayback());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handlePlayerPlayback());
  }

  isVisible() {
    // eslint-disable-next-line react/no-find-dom-node
    const dimensions = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const { height, top, bottom } = dimensions;

    if (bottom > HEADER_BAR_HEIGHT && top < height + HEADER_BAR_HEIGHT) {
      return true;
    }
    return false;
  }

  handlePlayerPlayback() {
    const { player } = this.state;
    if (player) {
      if (this.isVisible()) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }

  render() {
    const { video, title, dataState } = this.props;
    const opts = MusicPage.generateYoutubeOptions();

    return (
      <div className="music">
        <PageLoader loaded={dataState === DataStates.Fetched}>
          <div className="player-title">{title}</div>
          <Youtube videoId={video} opts={opts} onReady={event => this.setState({ player: event.target })} />
          <div className="player-more-info">
            <button onClick={() => window.open(process.env.YOUTUBE_CHANNEL)}>
              Visit our YouTube page
              <YoutubeIcon className="youtube-icon" />
            </button>
          </div>
        </PageLoader>
      </div>
    );
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
