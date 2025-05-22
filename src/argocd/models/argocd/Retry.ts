export interface Retry {
  limit: number;
  backoff: Backoff;
}

export interface Backoff {
  duration: string;
  factor: number;
  maxDuration: string;
}
