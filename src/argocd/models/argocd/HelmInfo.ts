export interface HelmInfo {
  valueFiles: string[];
  releaseName: string;
  version: string;
  ignoreMissingValueFiles: boolean;
}
