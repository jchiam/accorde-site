import types from 'actions/types';
import DataStates from 'constants/dataStates';

const initialState = {
  video: '',
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_YOUTUBE_VIDEO:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case types.FETCH_YOUTUBE_VIDEO_SUCCESS:
      return {
        ...state,
        video: action.video,
        dataState: DataStates.Fetched
      };
    case types.FETCH_YOUTUBE_VIDEO_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
