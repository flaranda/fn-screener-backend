import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { UserCriteriaMongoImportance } from './UserCriteriaMongoImportance';

export interface UserCriteriaMongo extends EntityMongo {
  criteria_uuid: string;
  importance: UserCriteriaMongoImportance;
  user_uuid: string;
}
