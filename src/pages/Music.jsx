import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Youtube from 'react-youtube';

import PageLoader from 'components/PageLoader';
import { fetchRandomVideo } from 'actions/youtube';
import DataStates from 'constants/dataStates';
import YoutubeIcon from 'images/youtube.svg';

const HEADER_BAR_HEIGHT = 60;

class MusicPage extends Component {
  static generateYoutubeOptions() {
    return {
      height: 1600,
      width: 900,
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
    this.onPlayerPlayback = this.handlePlayerPlayback.bind(this);
  }

  componentDidMount() {
    const { fetchVideo } = this.props;
    fetchVideo();
    window.addEventListener('scroll', this.onPlayerPlayback);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onPlayerPlayback);
  }


  isVisible() {
    // eslint-disable-next-line react/no-find-dom-node
    const dimensions = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const { height, top, bottom } = dimensions;

    if (bottom > HEADER_BAR_HEIGHT && top < height) {
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
          <div className="player-container">
            <Youtube videoId={video} opts={opts} onReady={event => this.setState({ player: event.target })} />
          </div>
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
