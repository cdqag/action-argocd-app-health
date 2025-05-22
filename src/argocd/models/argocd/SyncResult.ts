import { type Resource } from './Resource';
import { type Source } from './Source';

export interface SyncResult {
  resources: Resource[];
  revision: string;
  source: Source;
}
