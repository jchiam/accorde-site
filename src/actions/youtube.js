import axios from 'axios';
import types from 'actions/types';

const YOUTUBE_PLAYLISTS_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

export function fetchRandomVideo() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_YOUTUBE_VIDEO });

    axios.get(
      YOUTUBE_PLAYLISTS_URL,
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          playlistId: process.env.YOUTUBE_UPLOADS_ID,
          part: 'contentDetails'
        }
      })
      .then(response => response.data)
      .then(data => {
        const numVideos = data.items.length;
        const randomIndex = Math.floor(Math.random() * numVideos);
        const randomVideoId = data.items[randomIndex].contentDetails.videoId;

        dispatch({ type: types.FETCH_YOUTUBE_VIDEO_SUCCESS, video: randomVideoId });
      });
  };
}
