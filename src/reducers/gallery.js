import types from 'actions/types';
import DataStates from 'constants/dataStates';

const initialState = {
  photos: [],
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_GALLERY:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case types.FETCH_GALLERY_SUCCESS:
      return {
        ...state,
        photos: action.photos,
        dataState: DataStates.Fetched
      };
    case types.FETCH_GALLERY_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
