import { MusicActionKeys, MusicActions } from 'actions';
import { DataStates } from 'constants/dataStates';
import { State } from 'typings/state';

const initialState: State.Music = {
  video: '',
  title: '',
  dataState: DataStates.Unfetched
};

export default (state = initialState, action: MusicActions): State.Music => {
  switch (action.type) {
    case MusicActionKeys.FETCHING_YOUTUBE_VIDEO:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case MusicActionKeys.FETCH_YOUTUBE_VIDEO_SUCCESS:
      return {
        ...state,
        video: action.payload.video,
        title: action.payload.title,
        dataState: DataStates.Fetched
      };
    case MusicActionKeys.FETCH_YOUTUBE_VIDEO_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
