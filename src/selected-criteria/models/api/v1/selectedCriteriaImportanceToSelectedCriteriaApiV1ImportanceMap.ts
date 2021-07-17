import { SelectedCriteriaImportance } from '../../domain/SelectedCriteriaImportance';
import { SelectedCriteriaApiV1Importance } from './SelectedCriteriaApiV1Importance';

export const selectedCriteriaImportanceToSelectedCriteriaApiV1ImportanceMap: {
  [TKey in SelectedCriteriaImportance]: SelectedCriteriaApiV1Importance;
} = {
  [SelectedCriteriaImportance.MustHave]:
    SelectedCriteriaApiV1Importance.must_have,
  [SelectedCriteriaImportance.NiceToHave]:
    SelectedCriteriaApiV1Importance.nice_to_have,
  [SelectedCriteriaImportance.SuperNiceToHave]:
    SelectedCriteriaApiV1Importance.super_nice_to_have,
};
