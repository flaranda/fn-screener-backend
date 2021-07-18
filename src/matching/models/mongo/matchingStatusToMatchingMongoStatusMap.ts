import { MatchingStatus } from '../domain/MatchingStatus';
import { MatchingMongoStatus } from './MatchingMongoStatus';

export const matchingStatusToMatchingMongoStatusMap: {
  [TKey in MatchingStatus]: MatchingMongoStatus;
} = {
  [MatchingStatus.Meet]: MatchingMongoStatus.meet,
  [MatchingStatus.Pass]: MatchingMongoStatus.pass,
  [MatchingStatus.Pending]: MatchingMongoStatus.pending,
};
