export interface SecurityContext {
  allowPrivilegeEscalation?: boolean;
  privileged?: boolean;
  procMount?: string;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: SeccompProfile;
  capabilities?: Capabilities;
}

export interface SeccompProfile {
  type: string;
}

export interface Capabilities {
  add?: string[];
  drop?: string[];
}
