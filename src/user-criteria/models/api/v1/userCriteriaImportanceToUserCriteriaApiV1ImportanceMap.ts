import { UserCriteriaImportance } from '../../domain/UserCriteriaImportance';
import { UserCriteriaApiV1Importance } from './UserCriteriaApiV1Importance';

export const userCriteriaImportanceToUserCriteriaApiV1ImportanceMap: {
  [TKey in UserCriteriaImportance]: UserCriteriaApiV1Importance;
} = {
  [UserCriteriaImportance.MustHave]: UserCriteriaApiV1Importance.must_have,
  [UserCriteriaImportance.NiceToHave]: UserCriteriaApiV1Importance.nice_to_have,
  [UserCriteriaImportance.SuperNiceToHave]:
    UserCriteriaApiV1Importance.super_nice_to_have,
};
