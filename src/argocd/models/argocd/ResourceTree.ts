import { type Node } from './Node';
import { type Host } from './Host';

export interface ResourceTree {
  nodes: Node[];
  orphanedNodes: Node[];
  hosts: Host[];
}
