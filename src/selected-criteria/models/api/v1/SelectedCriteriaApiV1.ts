import { SelectedCriteriaApiV1Importance } from './SelectedCriteriaApiV1Importance';

export interface SelectedCriteriaApiV1 {
  readonly criteria_name: string;
  readonly criteria_uuid: string;
  readonly importance: SelectedCriteriaApiV1Importance;
  readonly uuid: string;
}
