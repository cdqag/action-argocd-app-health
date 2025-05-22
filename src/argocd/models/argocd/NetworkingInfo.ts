import { type TargetRef } from "./TargetRef";
import { type Ingress } from "../Ingress";

export interface NetworkingInfo {
  labels?: Record<string, string>;
  targetLabels?: Record<string, string>;
  targetRefs?: TargetRef[];
  ingress?: Ingress[];
  externalURLs?: string[];
}
