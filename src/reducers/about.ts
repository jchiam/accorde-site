import { AboutActionKeys, AboutActions } from 'actions';
import { DataStates } from 'constants/dataStates';
import { State } from 'typings/state';

const initialState: State.About = {
  story: '',
  events: {},
  photos: {
    story: '',
    events: ''
  },
  dataState: DataStates.Unfetched
};

export default (state = initialState, action: AboutActions): State.About =>  {
  switch (action.type) {
    case AboutActionKeys.FETCHING_ABOUT_US:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case AboutActionKeys.FETCH_ABOUT_US_SUCCESS: {
      const photos = {
        story: action.payload.photos['our-story'],
        events: action.payload.photos['event-highlights']
      };
      return {
        ...state,
        story: action.payload.story,
        events: action.payload.events,
        photos,
        dataState: DataStates.Fetched
      };
    }
    case AboutActionKeys.FETCH_ABOUT_US_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
