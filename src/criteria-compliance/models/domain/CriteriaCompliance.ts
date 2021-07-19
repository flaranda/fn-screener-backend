import { Entity } from '../../../common/models/domain/Entity';
import { CriteriaComplianceAnswer } from './CriteriaComplianceAnswer';

export interface CriteriaCompliance extends Entity {
  readonly answer: CriteriaComplianceAnswer;
  readonly criteriaUuid: string;
  readonly startupUuid: string;
}
