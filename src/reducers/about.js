import types from 'actions/types';
import DataStates from 'constants/dataStates';

const initialState = {
  story: '',
  events: {},
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_ABOUT_US:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case types.FETCH_ABOUT_US_SUCCESS:
      return {
        ...state,
        story: action.story,
        events: action.events,
        dataState: DataStates.Fetched
      };
    case types.FETCH_ABOUT_US_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
