import { UserCriteriaImportance } from '../../domain/UserCriteriaImportance';
import { UserCriteriaApiV1Importance } from './UserCriteriaApiV1Importance';

export const userCriteriaApiV1ImportanceToUserCriteriaImportanceMap: {
  [TKey in UserCriteriaApiV1Importance]: UserCriteriaImportance;
} = {
  [UserCriteriaApiV1Importance.must_have]: UserCriteriaImportance.MustHave,
  [UserCriteriaApiV1Importance.nice_to_have]: UserCriteriaImportance.NiceToHave,
  [UserCriteriaApiV1Importance.super_nice_to_have]:
    UserCriteriaImportance.SuperNiceToHave,
};
