import { type NodeAffinity } from "./NodeAffinity";
import { type PodAffinity } from "./PodAffinity";


export interface Affinity {
  nodeAffinity?: NodeAffinity;
  nodeAntiAffinity?: NodeAffinity;

  podAffinity?: PodAffinity;
  podAntiAffinity?: PodAffinity;
}
