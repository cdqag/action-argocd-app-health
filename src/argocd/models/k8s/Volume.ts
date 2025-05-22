import { 
  type DownwardAPI,
  type DownwardAPISource } from "./DownwardAPI";
import { type PersistentVolumeClaim } from "./PersistentVolumeClaim";


export interface Volume {
  emptyDir?: EmptyDir;
  configMap?: ConfigMap;
  secret?: Secret;
  projected?: Projected;
  persistentVolumeClaim?: PersistentVolumeClaim;
  name: string;
  downwardAPI?: DownwardAPI;
}

export interface ConfigMap {
  defaultMode: number;
  name: string;
}

export interface Secret {
  defaultMode: number;
  secretName: string;
}

export interface Projected {
  defaultMode: number;
  sources: ProjectedSource[];
}

export interface ProjectedSource {
  serviceAccountToken?: ServiceAccountToken;
  configMap?: ConfigMapSource;
  downwardAPI?: DownwardAPISource;
}

export interface ServiceAccountToken {
  audience: string;
  expirationSeconds: number;
  path: string;
}

export interface ConfigMapSource {
  items: ConfigMapItem[];
  name: string;
}

export interface ConfigMapItem {
  key: string;
  path: string;
}

export interface EmptyDir {
  medium?: string;
}
