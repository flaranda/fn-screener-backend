import { MatchingStatus } from './MatchingStatus';

export interface Matching {
  readonly userUuid: string;
  readonly startupUuid: string;
  readonly status: MatchingStatus;
}
