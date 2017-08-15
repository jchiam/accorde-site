import types from 'actions/types';
import DataStates from 'constants/dataStates';

const initialState = {
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_UPCOMING_EVENT:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case types.FETCH_UPCOMING_EVENT_SUCCESS: {
      if (action.event.publish) {
        return {
          ...state,
          event: action.event,
          dataState: DataStates.Fetched
        };
      } else {
        return null;
      }
    }
    case types.FETCH_UPCOMING_EVENT_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
