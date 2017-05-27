import { combineReducers } from 'redux';
import music from 'reducers/music';

const combinedReducer = combineReducers({
  music
});

export default combinedReducer;
