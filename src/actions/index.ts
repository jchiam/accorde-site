import { createAction } from 'actionHelpers';
import { Models } from 'typings/models';

export enum UpcomingActionKeys {
  FETCHING_UPCOMING_EVENT = 'FETCHING_UPCOMING_EVENT',
  FETCH_UPCOMING_EVENT_SUCCESS = 'FETCH_UPCOMING_EVENT',
  FETCH_UPCOMING_EVENT_ERROR = 'FETCH_UPCOMING_EVENT_ERROR'
}

export enum AboutActionKeys {
  FETCHING_ABOUT_US = 'FETCHING_ABOUT_US',
  FETCH_ABOUT_US_SUCCESS = 'FETCH_ABOUT_US_SUCCESS',
  FETCH_ABOUT_US_ERROR = 'FETCH_ABOUT_US_ERROR'
}

export enum MusicActionKeys {
  FETCHING_YOUTUBE_VIDEO = 'FETCHING_YOUTUBE_VIDEO',
  FETCH_YOUTUBE_VIDEO_SUCCESS = 'FETCH_YOUTUBE_VIDEO_SUCCESS',
  FETCH_YOUTUBE_VIDEO_ERROR = 'FETCH_YOUTUBE_VIDEO_ERROR'
}

export enum GalleryActionKeys {
  FETCHING_GALLERY = 'FETCHING_GALLERY',
  FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS',
  FETCH_GALLERY_ERROR = 'FETCH_GALLERY_ERROR'
}

export const UpcomingActions = {
  fetchingUpcomingEvent: () => createAction(UpcomingActionKeys.FETCHING_UPCOMING_EVENT),
  fetchUpcomingEventSuccess: (event: Models.UpcomingEvent) => createAction(UpcomingActionKeys.FETCH_UPCOMING_EVENT_SUCCESS, event),
  fetchUpcomingEventError: () => createAction(UpcomingActionKeys.FETCH_UPCOMING_EVENT_ERROR)
};

export const AboutActions = {
  fetchingAboutUs: () => createAction(AboutActionKeys.FETCHING_ABOUT_US),
  fetchAboutUsSuccess: (p: {
    story: string;
    events: { [key: string]: Array<Models.Event> };
    photos: { [key: string]: string };
  }) =>
    createAction(AboutActionKeys.FETCH_ABOUT_US_SUCCESS, p),
  fetchAboutUsError: () => createAction(AboutActionKeys.FETCH_ABOUT_US_ERROR)
};

export const MusicActions = {
  fetchingYoutubeVideo: () => createAction(MusicActionKeys.FETCHING_YOUTUBE_VIDEO),
  fetchYoutubeVideoSuccess: (v: { video: string; title: string }) => createAction(MusicActionKeys.FETCH_YOUTUBE_VIDEO_SUCCESS, v),
  fetchYoutubeVideoError: () => createAction(MusicActionKeys.FETCH_YOUTUBE_VIDEO_ERROR)
};

export const GalleryActions = {
  fetchingGallery: () => createAction(GalleryActionKeys.FETCHING_GALLERY),
  fetchGallerySuccess: (photos: Array<string>) => createAction(GalleryActionKeys.FETCH_GALLERY_SUCCESS, photos),
  fetchGalleryError: () => createAction(GalleryActionKeys.FETCH_GALLERY_ERROR),
};

export type UpcomingActions = ActionsUnion<typeof UpcomingActions>;
export type AboutActions = ActionsUnion<typeof AboutActions>;
export type MusicActions = ActionsUnion<typeof MusicActions>;
export type GalleryActions = ActionsUnion<typeof GalleryActions>;
