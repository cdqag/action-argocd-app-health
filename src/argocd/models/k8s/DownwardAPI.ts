import { type FieldRef } from "./FieldRef";


export interface DownwardAPI {
  defaultMode: number;
  items: DownwardAPIItem[];
}

export interface DownwardAPISource {
  items: DownwardAPIItem[];
}

export interface DownwardAPIItem {
  fieldRef: FieldRef;
  path: string;
}
