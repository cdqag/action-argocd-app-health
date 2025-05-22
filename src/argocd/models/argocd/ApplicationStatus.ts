import { type Resource } from "./Resource";
import { type Sync } from "./Sync";
import { type Health } from "./Health";
import { type StatusHistory } from "./StatusHistory";
import { type OperationState } from "./OperationState";
import { type StatusSummary } from "./StatusSummary";

export interface ApplicationStatus {
  resources: Resource[];
  sync: Sync;
  health: Health;
  history: StatusHistory[];
  reconciledAt: string;
  operationState: OperationState;
  sourceType: string;
  summary: StatusSummary;
  controllerNamespace: string;
}
