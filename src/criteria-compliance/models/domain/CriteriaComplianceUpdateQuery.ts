import { EntityUpdateQuery } from '../../../common/models/domain/EntityUpdateQuery';
import { CriteriaComplianceAnswer } from './CriteriaComplianceAnswer';

export interface CriteriaComplianceUpdateQuery extends EntityUpdateQuery {
  answer?: CriteriaComplianceAnswer;
}
