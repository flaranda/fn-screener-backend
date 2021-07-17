import { EntityFindQuery } from '../../../common/models/domain/EntityFindQuery';

export interface UserCriteriaFindQuery extends EntityFindQuery {
  userUuid?: string;
}
