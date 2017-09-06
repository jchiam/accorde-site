import axios from 'axios';
import types from 'actions/types';

const YOUTUBE_PLAYLISTS_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

export default function fetchRandomVideo() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_YOUTUBE_VIDEO });

    axios.get(
      YOUTUBE_PLAYLISTS_URL,
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          playlistId: process.env.YOUTUBE_UPLOADS_ID,
          part: 'contentDetails,snippet'
        }
      })
      .then(response => response.data)
      .then((data) => {
        const numVideos = data.items.length;
        const randomIndex = Math.floor(Math.random() * numVideos);
        const randomVideoId = data.items[randomIndex].contentDetails.videoId;
        let randomVideoTitle = data.items[randomIndex].snippet.title;

        // process video title
        if (randomVideoTitle.includes('|')) {
          randomVideoTitle = randomVideoTitle.split('|')[0];
        }

        dispatch({
          type: types.FETCH_YOUTUBE_VIDEO_SUCCESS,
          video: randomVideoId,
          title: randomVideoTitle
        });
      })
      .catch(() => dispatch({ type: types.FETCH_YOUTUBE_VIDEO_ERROR }));
  };
}
