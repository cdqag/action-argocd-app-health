import { type ParentRef } from './ParentRef';
import { type Health } from './Health';
import { type NameValue } from '../NameValue';
import { type NetworkingInfo } from './NetworkingInfo';

export interface Node {
  version: string;
  kind: string;
  namespace: string;
  name: string;
  uid: string;
  parentRefs?: ParentRef[];
  resourceVersion: string;
  createdAt: string;
  info?: NameValue[];
  networkingInfo?: NetworkingInfo;
  images?: string[];
  health?: Health;
}
