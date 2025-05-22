export interface OwnerRef {
  apiVersion: string;
  kind: string;
  name: string;
  uid: string;
  controller: boolean;
  blockOwnerDeletion: boolean;
}
