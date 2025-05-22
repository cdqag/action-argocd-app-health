import { type Volume } from "./Volume";
import { type Toleration } from "./Toleration";
import { type SecurityContext } from "./SecurityContext";
import { type Affinity } from "./Affinity";
import { type Container } from "./Container";
import { type DNSConfig } from "./DNSConfig";


export interface Spec {
  affinity?: Affinity;
  containers: Container[];
  dnsConfig?: DNSConfig;
  dnsPolicy: string;
  enableServiceLinks: boolean;
  imagePullSecrets?: ImagePullSecret[];
  initContainers?: Container[];
  nodeName: string;
  preemptionPolicy: string;
  priority: number;
  priorityClassName: string;
  restartPolicy: string;
  schedulerName: string;
  securityContext: SecurityContext;
  serviceAccount: string;
  serviceAccountName: string;
  terminationGracePeriodSeconds: number;
  tolerations: Toleration[];
  volumes: Volume[];
}

export interface ImagePullSecret {
  name: string;
}
