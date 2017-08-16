import { combineReducers } from 'redux';
import upcoming from 'reducers/upcoming';
import about from 'reducers/about';
import music from 'reducers/music';
import gallery from 'reducers/gallery';

export default combineReducers({
  upcoming,
  about,
  music,
  gallery
});
