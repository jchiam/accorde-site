export namespace State {

  interface AppState {
    upcoming: Upcoming;
    about: About;
    music: Music;
    gallery: Gallery;
  }

  interface Upcoming {
    event: {
      publish: boolean;
      image: string;
      text: string;
      link?: string;
    };
    dataState: string;
  }

  interface About {
    story: string;
    events: { [key: string]: Array<{
      name: string;
      link?: string;
      sub?: string;
    }>; };
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
