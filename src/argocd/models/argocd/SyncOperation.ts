import { type SyncStrategy } from "./SyncStrategy";
import { type Source } from "./Source";

export interface SyncOperation {
  revision: string;
  syncStrategy: SyncStrategy;
  source: Source;
}
