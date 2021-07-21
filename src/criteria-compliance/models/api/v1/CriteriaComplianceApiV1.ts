import { CriteriaComplianceApiV1Answer } from './CriteriaComplianceApiV1Answer';

export interface CriteriaComplianceApiV1 {
  readonly answer: CriteriaComplianceApiV1Answer;
  readonly criteria_name: string;
  readonly criteria_uuid: string;
  readonly startup_name: string;
  readonly startup_uuid: string;
  readonly uuid: string;
}
