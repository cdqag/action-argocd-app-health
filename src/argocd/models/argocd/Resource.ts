import { type Health } from './Health';

export interface Resource {
  group?: string;
  version: string;
  kind: string;
  namespace: string;
  name: string;
  status: string;
  health?: Health;
  message?: string;
  hookPhase?: string;
  syncPhase?: string;
}
