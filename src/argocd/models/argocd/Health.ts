import { type HealthStatus } from './HealthStatus';

export interface Health {
  status: HealthStatus;
  message?: string;
}
