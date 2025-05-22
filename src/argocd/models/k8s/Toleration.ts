export interface Toleration {
  effect: string;
  key: string;
  operator: string;
  value?: string;
  tolerationSeconds?: number;
}
