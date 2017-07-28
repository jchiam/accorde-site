import { combineReducers } from 'redux';
import about from 'reducers/about';
import music from 'reducers/music';
import gallery from 'reducers/gallery';

export default combineReducers({
  about,
  music,
  gallery
});
