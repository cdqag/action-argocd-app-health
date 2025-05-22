import { type LabelSelector } from './LabelSelector';


export interface PodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution?: PodAffinityEntry[];
  requiredDuringSchedulingIgnoredDuringExecution?: PodAffinityEntry[];
}

export interface PodAffinityEntry {
  podAffinityTerm: PodAffinityTerm;
  weight: number;
}

export interface PodAffinityTerm {
  labelSelector: LabelSelector;
  topologyKey: string;
}
