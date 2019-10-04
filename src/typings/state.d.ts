import { Models } from 'typings/models';

export namespace State {
  interface AppState {
    upcoming: Upcoming;
    about: About;
    music: Music;
    gallery: Gallery;
  }

  interface Upcoming {
    event: Models.UpcomingEvent;
    dataState: string;
  }

  interface About {
    story: string;
    events: { [key: string]: Array<Models.Event> };
    photos: {
      story: string;
      events: string;
    };
    dataState: string;
  }

  interface Music {
    video: string;
    title: string;
    dataState: string;
  }

  interface Gallery {
    photos: Array<string>;
    dataState: string;
  }
}
