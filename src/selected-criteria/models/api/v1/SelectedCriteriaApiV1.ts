import { SelectedCriteriaApiV1Importance } from './SelectedCriteriaApiV1Importance';

export interface SelectedCriteriaApiV1 {
  criteria_name: string;
  criteria_uuid: string;
  importance: SelectedCriteriaApiV1Importance;
  uuid: string;
}
