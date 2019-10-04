import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Youtube, { Options } from 'react-youtube';
import MobileDetect from 'mobile-detect';

import PageLoader from 'components/PageLoader';
import fetchRandomVideo from 'actions/youtube';
import { DataStates } from 'constants/dataStates';
import { State } from 'typings/state';

const md = new MobileDetect(window.navigator.userAgent);

const HEADER_BAR_HEIGHT = 60;
const YOUTUBE_ERROR_MESSAGE = 'There seems to be an error. Please refresh or try again later.';

interface MusicPageProps {
  video: string;
  title: string;
  dataState: string;
  fetchVideo: () => void;
}

interface MusicPageState {
  player: any;
}

class MusicPage extends Component<MusicPageProps, MusicPageState> {
  onPlayerPlayback: () => void;

  static generateYoutubeOptions(): Options {
    return {
      height: '1600',
      width: '900',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        color: 'white',
        rel: 0,
        showinfo: 0
      }
    };
  }

  constructor(props: MusicPageProps) {
    super(props);
    this.state = { player: null };
    this.onPlayerPlayback = this.handlePlayerPlayback.bind(this);
  }

  componentDidMount() {
    const { fetchVideo } = this.props;
    fetchVideo();
    if (!md.mobile()) {
      window.addEventListener('scroll', this.onPlayerPlayback);
    }
  }

  componentWillUnmount() {
    if (!md.mobile()) {
      window.removeEventListener('scroll', this.onPlayerPlayback);
    }
  }


  isVisible() {
    // eslint-disable-next-line react/no-find-dom-node
    const dimensions = (ReactDOM.findDOMNode(this) as Element).getBoundingClientRect();
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

  renderContents() {
    const { video, title, dataState } = this.props;
    const opts = MusicPage.generateYoutubeOptions();

    if (dataState === DataStates.Error) {
      return YOUTUBE_ERROR_MESSAGE;
    }

    return (
      <>
        <div className="player-title">{title}</div>
        <div className="player-container">
          <Youtube videoId={video} opts={opts} onReady={event => this.setState({ player: event.target })} />
        </div>
        <div className="player-more-info">
          <button onClick={() => window.open(process.env.YOUTUBE_CHANNEL)}>
            Visit our YouTube page
            <img className="youtube-icon" src={require('images/youtube.svg')} />
          </button>
        </div>
      </>
    );
  }

  render() {
    const { dataState } = this.props;
    return (
      <div className="music">
        <PageLoader loaded={dataState !== DataStates.Fetching}>
          {this.renderContents()}
        </PageLoader>
      </div>
    );
  }
}

function mapStateToProps(state: State.AppState) {
  return {
    video: state.music.video,
    title: state.music.title,
    dataState: state.music.dataState
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchVideo: () => dispatch<any>(fetchRandomVideo())
  };
}

const Music = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage);
export default Music;
