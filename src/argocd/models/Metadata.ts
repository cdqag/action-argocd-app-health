import { type OwnerRef } from "./argocd/OwnerRef";
import { type ManagedField } from "./ManagedField";

export interface Metadata {
  name: string;
  namespace: string;
  uid: string;
  resourceVersion: string;
  
  generation?: number;
  generateName?: string;
  creationTimestamp: string;
  
  ownerReferences?: OwnerRef[];
  managedFields: ManagedField[];

  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}
