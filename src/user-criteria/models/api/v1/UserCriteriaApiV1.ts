import { UserCriteriaApiV1Importance } from './UserCriteriaApiV1Importance';

export interface UserCriteriaApiV1 {
  criteria_name: string;
  importance: UserCriteriaApiV1Importance;
  uuid: string;
}
