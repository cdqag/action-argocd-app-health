import { type MatchExpression } from "./MatchExpression";


export interface LabelSelector {
  matchExpressions: MatchExpression[];
}
