import { type ComparedTo } from './ComparedTo';

export interface Sync {
  status: string;
  comparedTo: ComparedTo;
  revision: string;
}
