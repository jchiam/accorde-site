import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Youtube from 'react-youtube';

import { fetchRandomVideo } from 'actions/youtube';
import DataStates from 'constants/dataStates';

class MusicPage extends Component {
  componentDidMount() {
    const { fetchVideo } = this.props;
    fetchVideo();
  }

  render() {
    const { video, dataState } = this.props;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        color: 'white',
        rel: 0,
        showinfo: 0
      }
    };

    if (dataState === DataStates.Fetched) {
      return (
        <div className="music">
          <Youtube videoId={video} opts={opts} />
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
