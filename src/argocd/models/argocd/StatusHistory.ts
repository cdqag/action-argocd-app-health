import { type Source } from './Source';

export interface StatusHistory {
  revision: string;
  deployedAt: string;
  id: number;
  source: Source;
  deployStartedAt: string;
  initiatedBy: Record<string, unknown>;
}
