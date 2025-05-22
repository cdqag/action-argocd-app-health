import { type EventsMetadata } from "./EventsMetadata";
import { type EventItem } from "./EventItem";

export interface Events {
  metadata: EventsMetadata;
  items: EventItem[];
}
