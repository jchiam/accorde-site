import { combineReducers } from 'redux';
import about from 'reducers/about';
import music from 'reducers/music';

export default combineReducers({
  about,
  music
});
