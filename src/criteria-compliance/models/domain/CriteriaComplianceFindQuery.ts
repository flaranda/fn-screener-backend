import { EntityFindQuery } from '../../../common/models/domain/EntityFindQuery';

export interface CriteriaComplianceFindQuery extends EntityFindQuery {
  startupUuid?: string;
}
