export namespace Models {
  interface UpcomingEvent {
    publish: boolean;
    image: string;
    text: string;
    link?: string;
  }

  interface Event {
    name: string;
    link?: string;
    sub?: string;
  }
}
