import { UserCriteriaMongo } from './UserCriteriaMongo';
import { UserCriteriaMongoImportance } from './UserCriteriaMongoImportance';

export interface UserCriteriaMongoSeed extends Partial<UserCriteriaMongo> {
  criteria_uuid: string;
  importance: UserCriteriaMongoImportance;
  user_uuid: string;
  uuid: string;
}
