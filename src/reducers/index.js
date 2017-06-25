import { combineReducers } from 'redux';
import about from 'reducers/about';
import music from 'reducers/music';
import gallery from 'reducers/gallery';
import contact from 'reducers/contact';

export default combineReducers({
  about,
  music,
  gallery,
  contact
});
