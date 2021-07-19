import { CriteriaComplianceApiV1Answer } from './CriteriaComplianceApiV1Answer';

export interface CriteriaComplianceApiV1 {
  answer: CriteriaComplianceApiV1Answer;
  criteria_name: string;
  criteria_uuid: string;
  startup_name: string;
  startup_uuid: string;
  uuid: string;
}
