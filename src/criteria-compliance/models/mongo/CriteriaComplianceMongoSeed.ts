import { CriteriaComplianceMongo } from './CriteriaComplianceMongo';
import { CriteriaComplianceMongoAnswer } from './CriteriaComplianceMongoAnswer';

export interface CriteriaComplianceMongoSeed
  extends Partial<CriteriaComplianceMongo> {
  answer: CriteriaComplianceMongoAnswer;
  criteria_uuid: string;
  startup_uuid: string;
  uuid: string;
}
