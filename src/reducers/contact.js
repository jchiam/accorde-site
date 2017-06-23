import types from 'actions/types';
import DataStates from 'constants/dataStates';

const initialState = {
  photo: '',
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_CONTACT_US:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case types.FETCH_CONTACT_US_SUCCESS:
      return {
        ...state,
        photo: action.photo,
        dataState: DataStates.Fetched
      };
    case types.FETCH_CONTACT_US_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
