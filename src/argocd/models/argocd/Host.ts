import { type SystemInfo } from './SystemInfo';
import { type ResourceInfo } from './ResourceInfo';

export interface Host {
  name: string;
  resourcesInfo: ResourceInfo[];
  systemInfo: SystemInfo;
}
