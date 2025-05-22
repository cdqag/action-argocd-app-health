import { type MatchExpression } from "./MatchExpression";


export interface NodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: NodeAffinityEntry;
  requiredDuringSchedulingIgnoredDuringExecution: NodeAffinityEntry;
}

export interface NodeAffinityEntry {
  nodeSelectorTerms: NodeSelectorTerm[];
}

export interface NodeSelectorTerm {
  matchExpressions: MatchExpression[];
}
