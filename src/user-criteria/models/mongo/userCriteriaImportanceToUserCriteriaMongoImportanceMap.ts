import { UserCriteriaImportance } from '../domain/UserCriteriaImportance';
import { UserCriteriaMongoImportance } from './UserCriteriaMongoImportance';

export const userCriteriaImportanceToUserCriteriaMongoImportanceMap: {
  [TKey in UserCriteriaImportance]: UserCriteriaMongoImportance;
} = {
  [UserCriteriaImportance.MustHave]: UserCriteriaMongoImportance.must_have,
  [UserCriteriaImportance.NiceToHave]: UserCriteriaMongoImportance.nice_to_have,
  [UserCriteriaImportance.SuperNiceToHave]:
    UserCriteriaMongoImportance.super_nice_to_have,
};
