import { type ContainerStatus } from "./ContainerStatus";
import { type IP } from "./IP";


export interface Status {
  conditions: Condition[];
  containerStatuses: ContainerStatus[];
  hostIP: string;
  hostIPs: IP[];
  initContainerStatuses: ContainerStatus[];
  phase: string;
  podIP: string;
  podIPs: IP[];
  qosClass: string;
  startTime: string;
}

export interface Condition {
  lastProbeTime: string | null;
  lastTransitionTime: string;
  status: string;
  type: string;
  message?: string;
  reason?: string;
}
