import { type EnvVar } from "./EnvVar";
import { type Port } from "./Port";
import { type Probe } from "./Probe";
import { type ResizePolicy } from "./ResizePolicy";
import { type Resources } from "./Resources";
import { type SecurityContext } from "./SecurityContext";
import { type VolumeMount } from "./VolumeMount";


export interface Container {
  env?: EnvVar[];
  image: string;
  imagePullPolicy: string;
  lifecycle?: Lifecycle;
  livenessProbe?: Probe;
  name: string;
  ports?: Port[];
  readinessProbe?: Probe;
  resizePolicy?: ResizePolicy[];
  resources?: Resources;
  securityContext?: SecurityContext;
  startupProbe?: Probe;
  terminationMessagePath: string;
  terminationMessagePolicy: string;
  volumeMounts?: VolumeMount[];
}

export interface Lifecycle {
  preStop?: ExecAction;
}

export interface ExecAction {
  exec: Command;
}

export interface Command {
  command: string[];
}
