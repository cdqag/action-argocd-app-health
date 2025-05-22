import { type Operation } from "./Operation";
import { type SyncResult } from "./SyncResult";

export interface OperationState {
  operation: Operation;
  phase: string;
  message: string;
  syncResult: SyncResult;
  startedAt: string;
  finishedAt: string;
}
