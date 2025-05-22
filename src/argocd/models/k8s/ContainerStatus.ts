import type { VolumeMount } from "./VolumeMount";


export interface ContainerStatus {
  image: string;
  imageID: string;
  lastState: ContainerState;
  name: string;
  ready: boolean;
  restartCount: number;
  started: boolean;
  state: ContainerState;
  volumeMounts: VolumeMount[];
}

export interface ContainerState {
  waiting?: WaitingState;
  running?: RunningState;
  terminated?: TerminatedState;
}

export interface WaitingState {
  message: string;
  reason: string;
}

export interface RunningState {
  startedAt: string;
}

export interface TerminatedState {
  containerID: string;
  exitCode: number;
  finishedAt: string;
  reason: string;
  startedAt: string;
}
