import { type Source } from './Source';
import { type IgnoreDifference } from './IgnoreDifference';
import { type DeploymentDestination } from './DeploymentDestination';

export interface ComparedTo {
  source: Source;
  destination: DeploymentDestination;
  ignoreDifferences: IgnoreDifference[];
}
