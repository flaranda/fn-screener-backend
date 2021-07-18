import { CriteriaComplianceMongo } from './CriteriaComplianceMongo';

export interface CriteriaComplianceMongoSeed
  extends Partial<CriteriaComplianceMongo> {
  compliance: boolean;
  criteria_uuid: string;
  startup_uuid: string;
  uuid: string;
}
