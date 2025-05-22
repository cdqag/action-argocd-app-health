export interface Probe {
  failureThreshold: number;
  httpGet: HTTPGetAction;
  initialDelaySeconds: number;
  periodSeconds: number;
  successThreshold: number;
  timeoutSeconds: number;
}

export interface HTTPGetAction {
  path: string;
  port: number;
  scheme: string;
}
