import { SelectedCriteriaMongo } from './SelectedCriteriaMongo';
import { SelectedCriteriaMongoImportance } from './SelectedCriteriaMongoImportance';

export interface SelectedCriteriaMongoSeed
  extends Partial<SelectedCriteriaMongo> {
  criteria_uuid: string;
  importance: SelectedCriteriaMongoImportance;
  user_uuid: string;
  uuid: string;
}
