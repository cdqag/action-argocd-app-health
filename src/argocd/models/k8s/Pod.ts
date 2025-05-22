import { Metadata } from "../Metadata";
import { Spec } from "./Spec";
import { Status } from "./Status";

export interface Pod {
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: Spec;
  status: Status;
}


