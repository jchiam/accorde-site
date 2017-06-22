import { combineReducers } from 'redux';
import about from 'reducers/about';
import music from 'reducers/music';

const combinedReducer = combineReducers({
  about,
  music
});

export default combinedReducer;
