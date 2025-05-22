import { type FieldRef } from "./FieldRef";


export interface EnvVar {
  name: string;
  value?: string;
  valueFrom?: ValueFrom;
}

export interface ValueFrom {
  fieldRef?: FieldRef;
  resourceFieldRef?: ResourceFieldRef;
}

export interface ResourceFieldRef {
  resource: string;
  divisor: string;
}
