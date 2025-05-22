import { type Metadata } from "../Metadata";
import { type ApplicationSpec } from "./ApplicationSpec";
import { type ApplicationStatus } from "./ApplicationStatus";

export interface Application {
  metadata: Metadata;
  spec: ApplicationSpec;
  status: ApplicationStatus;
}
