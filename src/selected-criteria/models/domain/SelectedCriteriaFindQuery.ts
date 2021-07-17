import { EntityFindQuery } from '../../../common/models/domain/EntityFindQuery';

export interface SelectedCriteriaFindQuery extends EntityFindQuery {
  userUuid?: string;
}
