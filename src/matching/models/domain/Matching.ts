import { MatchingStatus } from './MatchingStatus';

export interface Matching {
  readonly startupUuid: string;
  readonly status: MatchingStatus;
  readonly userUuid: string;
}
