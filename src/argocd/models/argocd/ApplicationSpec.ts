import { type Source } from './Source';
import { type DeploymentDestination } from './DeploymentDestination';
import { type SyncPolicy } from './SyncPolicy';
import { type IgnoreDifference } from './IgnoreDifference';

export interface ApplicationSpec {
  source: Source;
  destination: DeploymentDestination;
  project: string;
  syncPolicy: SyncPolicy;
  ignoreDifferences: IgnoreDifference[];
}
