import { UpcomingActionKeys, UpcomingActions } from 'actions';
import { DataStates } from 'constants/dataStates';
import { State } from 'typings/state';

const initialState: State.Upcoming = {
  event: {
    publish: false,
    image: '',
    text: '',
    link: ''
  },
  dataState: DataStates.Unfetched
};

export default (state = initialState, action: UpcomingActions): State.Upcoming => {
  switch (action.type) {
    case UpcomingActionKeys.FETCHING_UPCOMING_EVENT:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case UpcomingActionKeys.FETCH_UPCOMING_EVENT_SUCCESS: {
      return {
        ...state,
        event: action.payload,
        dataState: DataStates.Fetched
      };
    }
    case UpcomingActionKeys.FETCH_UPCOMING_EVENT_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
};
