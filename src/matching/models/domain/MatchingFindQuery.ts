import { EntityFindQuery } from '../../../common/models/domain/EntityFindQuery';

export interface MatchingFindQuery extends EntityFindQuery {
  userUuid?: string;
}
