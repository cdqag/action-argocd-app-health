import { type SyncOperation } from "./SyncOperation";

export interface Operation {
  sync: SyncOperation;
  initiatedBy: InitiatedBy;
  retry: Record<string, unknown>;
}

export interface InitiatedBy {
  username: string;
}
