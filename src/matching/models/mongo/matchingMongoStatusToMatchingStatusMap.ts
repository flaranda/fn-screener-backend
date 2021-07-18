import { MatchingStatus } from '../domain/MatchingStatus';
import { MatchingMongoStatus } from './MatchingMongoStatus';

export const matchingMongoStatusToMatchingStatusMap: {
  [TKey in MatchingMongoStatus]: MatchingStatus;
} = {
  [MatchingMongoStatus.meet]: MatchingStatus.Meet,
  [MatchingMongoStatus.pass]: MatchingStatus.Pass,
  [MatchingMongoStatus.pending]: MatchingStatus.Pending,
};
