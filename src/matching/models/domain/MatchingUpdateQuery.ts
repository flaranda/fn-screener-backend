import { EntityUpdateQuery } from '../../../common/models/domain/EntityUpdateQuery';
import { MatchingStatus } from './MatchingStatus';

export interface MatchingUpdateQuery extends EntityUpdateQuery {
  status?: MatchingStatus;
}
