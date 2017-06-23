import types from 'actions/types';
import DataStates from 'constants/dataStates';

const initialState = {
  story: '',
  events: {},
  photos: {},
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ABOUT_US:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case types.FETCH_ABOUT_US_SUCCESS: {
      const photos = {
        story: action.photos['our-story'],
        events: action.photos['event-highlights']
      };
      return {
        ...state,
        story: action.story,
        events: action.events,
        photos,
        dataState: DataStates.Fetched
      };
    }
    case types.FETCH_ABOUT_US_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
