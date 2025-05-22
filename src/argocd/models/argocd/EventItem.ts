import { type Metadata } from '../Metadata';
import { type InvolvedObject } from './InvolvedObject';
import { type EventSource } from './EventSource';

export interface EventItem {
  metadata: Metadata;
  involvedObject: InvolvedObject;
  reason: string;
  message: string;
  source: EventSource;
  firstTimestamp: string;
  lastTimestamp: string;
  count: number;
  type: string;
  eventTime: string | null;
  reportingComponent: string;
  reportingInstance: string;
}
