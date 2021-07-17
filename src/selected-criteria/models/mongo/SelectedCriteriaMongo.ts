import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { SelectedCriteriaMongoImportance } from './SelectedCriteriaMongoImportance';

export interface SelectedCriteriaMongo extends EntityMongo {
  criteria_uuid: string;
  importance: SelectedCriteriaMongoImportance;
  user_uuid: string;
}
