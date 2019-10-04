import { Dispatch } from 'redux';
import axios from 'axios';
import { MusicActions } from 'actions';

const YOUTUBE_PLAYLISTS_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

export default function fetchRandomVideo() {
  return (dispatch: Dispatch<MusicActions>) => {
    dispatch(MusicActions.fetchingYoutubeVideo());

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

        dispatch(MusicActions.fetchYoutubeVideoSuccess({
          video: randomVideoId,
          title: randomVideoTitle
        }));
      })
      .catch(() => dispatch(MusicActions.fetchYoutubeVideoError()));
  };
}
