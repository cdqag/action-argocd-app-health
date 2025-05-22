import { type HelmInfo } from "./HelmInfo";

export interface Source {
  repoURL: string;
  path: string;
  targetRevision: string;
  helm: HelmInfo;
}
