import async from 'async';
import firebase from 'firebase/app';
import 'firebase/database';

import types from 'actions/types';

// initialize firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
};
firebase.initializeApp(config);

const database = firebase.database();

export function fetchUpcomingEvent() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_UPCOMING_EVENT });

    database.ref('/upcoming-event').once('value')
      .then(snapshot => dispatch({ type: types.FETCH_UPCOMING_EVENT_SUCCESS, event: snapshot.val() }));
  };
}

export function fetchAboutUs() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_ABOUT_US });

    async.parallel({
      story: cb => database.ref('/story').once('value').then(snapshot => cb(null, snapshot.val())),
      events: cb => database.ref('/events').once('value').then(snapshot => cb(null, snapshot.val())),
      photos: cb => database.ref('/photos').once('value').then(snapshot => cb(null, snapshot.val()))
    }, (err, results) => {
      dispatch({
        type: types.FETCH_ABOUT_US_SUCCESS,
        story: results.story,
        events: results.events,
        photos: results.photos
      });
    });
  };
}

export function fetchGallery() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_GALLERY });

    database.ref('/gallery').once('value')
      .then(snapshot => dispatch({ type: types.FETCH_GALLERY_SUCCESS, photos: snapshot.val() }));
  };
}
