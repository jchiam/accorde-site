import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Youtube, { Options } from 'react-youtube';
import MobileDetect from 'mobile-detect';

import PageLoader from 'components/PageLoader';
import { fetchRandomVideo } from 'actions/youtube';
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

const youtubeOptions: Options = {
  height: '1600',
  width: '900',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    color: 'white',
    rel: 0,
    showinfo: 0
  }
};

const MusicPage = (props: MusicPageProps) => {
  let musicPage: Nullable<HTMLDivElement> = null;

  const [player, updatePlayer] = useState(null as any);

  const { video, title, dataState, fetchVideo } = props;

  const isVisible = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const dimensions = (ReactDOM.findDOMNode(musicPage) as Element).getBoundingClientRect();
    const { height, top, bottom } = dimensions;

    if (bottom > HEADER_BAR_HEIGHT && top < height) {
      return true;
    }
    return false;
  }

  const onPlayerPlayback = () => {
    if (player) {
      if (isVisible()) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  };

  useEffect(() => { fetchVideo(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!md.mobile()) {
      window.addEventListener('scroll', onPlayerPlayback);

      return () => window.removeEventListener('scroll', onPlayerPlayback);
    }
  }, []);      // eslint-disable-line react-hooks/exhaustive-deps

  const renderContents = () => {
    if (dataState === DataStates.Error) {
      return YOUTUBE_ERROR_MESSAGE;
    }
    return (
      <>
        <div className="player-title">{title}</div>
        <div className="player-container">
          <Youtube videoId={video} opts={youtubeOptions} onReady={event => updatePlayer(event.target)} />
        </div>
        <div className="player-more-info">
          <button onClick={() => window.open(process.env.YOUTUBE_CHANNEL)}>
            Visit our YouTube page
            <img className="youtube-icon" src={require('images/youtube.svg')} />
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="music" ref={page => { musicPage = page; }}>
      <PageLoader loaded={dataState !== DataStates.Fetching}>
        {renderContents()}
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state: State.AppState) => ({
  video: state.music.video,
  title: state.music.title,
  dataState: state.music.dataState
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchVideo: () => dispatch<any>(fetchRandomVideo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage);
