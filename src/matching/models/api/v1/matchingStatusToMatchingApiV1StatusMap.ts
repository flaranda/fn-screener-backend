import { MatchingStatus } from '../../domain/MatchingStatus';
import { MatchingApiV1Status } from './MatchingApiV1Status';

export const matchingStatusToMatchingApiV1StatusMap: {
  [TKey in MatchingStatus]: MatchingApiV1Status;
} = {
  [MatchingStatus.Meet]: MatchingApiV1Status.meet,
  [MatchingStatus.Pass]: MatchingApiV1Status.pass,
  [MatchingStatus.Pending]: MatchingApiV1Status.pending,
};
