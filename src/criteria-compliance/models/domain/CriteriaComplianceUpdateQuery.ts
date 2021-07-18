import { EntityUpdateQuery } from '../../../common/models/domain/EntityUpdateQuery';

export interface CriteriaComplianceUpdateQuery extends EntityUpdateQuery {
  compliance?: boolean;
}
