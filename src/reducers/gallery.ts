import { GalleryActionKeys, GalleryActions } from 'actions';
import { DataStates } from 'constants/dataStates';

import { State } from 'typings/state';

const initialState: State.Gallery = {
  photos: [],
  dataState: DataStates.Unfetched
};

export default (state = initialState, action: GalleryActions): State.Gallery => {
  switch (action.type) {
    case GalleryActionKeys.FETCHING_GALLERY:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case GalleryActionKeys.FETCH_GALLERY_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        dataState: DataStates.Fetched
      };
    case GalleryActionKeys.FETCH_GALLERY_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
};
