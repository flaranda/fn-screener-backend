import { MatchingStatus } from '../../domain/MatchingStatus';
import { MatchingApiV1Status } from './MatchingApiV1Status';

export const matchingApiV1StatusToMatchingStatusMap: {
  [TKey in MatchingApiV1Status]: MatchingStatus;
} = {
  [MatchingApiV1Status.meet]: MatchingStatus.Meet,
  [MatchingApiV1Status.pass]: MatchingStatus.Pass,
  [MatchingApiV1Status.pending]: MatchingStatus.Pending,
};
