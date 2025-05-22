import { type LogEntry } from './LogEntry';

export interface PodLogs {
  podName: string;
  containerName: string;
  logs: LogEntry[];
}
