import { Dispatch } from 'redux';
import async from 'async';
import firebase from 'firebase/app';
import 'firebase/database';

import { UpcomingActions, AboutActions, GalleryActions } from 'actions';

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
  return (dispatch: Dispatch<UpcomingActions>) => {
    dispatch(UpcomingActions.fetchingUpcomingEvent());

    database.ref('/upcoming-event').once('value')
      .then(snapshot => dispatch(UpcomingActions.fetchUpcomingEventSuccess(snapshot.val())))
      .catch(() => dispatch(UpcomingActions.fetchUpcomingEventError()));
  };
}

export function fetchAboutUs() {
  return (dispatch: Dispatch<AboutActions>) => {
    dispatch(AboutActions.fetchingAboutUs());

    async.parallel({
      story: cb => database.ref('/story').once('value').then(snapshot => cb(null, snapshot.val())),
      events: cb => database.ref('/events').once('value').then(snapshot => cb(null, snapshot.val())),
      photos: cb => database.ref('/photos').once('value').then(snapshot => cb(null, snapshot.val()))
    }, (err, results) => {
      if (err) {
        dispatch(AboutActions.fetchAboutUsError());
      } else {
        dispatch(AboutActions.fetchAboutUsSuccess({
          story: results.story as string,
          events: results.events as { [key: string]: Array<{
            name: string;
            sub?: string;
            link?: string;
          }> },
          photos: results.photos as { [key: string]: string }
        }));
      }
    });
  };
}

export function fetchGallery() {
  return (dispatch: Dispatch<GalleryActions>) => {
    dispatch(GalleryActions.fetchingGallery());

    database.ref('/gallery').once('value')
      .then(snapshot => dispatch(GalleryActions.fetchGallerySuccess(snapshot.val() as Array<string>)))
      .catch(() => dispatch(GalleryActions.fetchGalleryError()));
  };
}
