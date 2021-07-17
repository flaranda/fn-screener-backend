import { UserCriteriaImportance } from '../domain/UserCriteriaImportance';
import { UserCriteriaMongoImportance } from './UserCriteriaMongoImportance';

export const userCriteriaMongoImportanceToUserCriteriaImportanceMap: {
  [TKey in UserCriteriaMongoImportance]: UserCriteriaImportance;
} = {
  [UserCriteriaMongoImportance.must_have]: UserCriteriaImportance.MustHave,
  [UserCriteriaMongoImportance.nice_to_have]: UserCriteriaImportance.NiceToHave,
  [UserCriteriaMongoImportance.super_nice_to_have]:
    UserCriteriaImportance.SuperNiceToHave,
};
