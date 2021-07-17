import { SelectedCriteriaImportance } from '../../domain/SelectedCriteriaImportance';
import { SelectedCriteriaApiV1Importance } from './SelectedCriteriaApiV1Importance';

export const selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap: {
  [TKey in SelectedCriteriaApiV1Importance]: SelectedCriteriaImportance;
} = {
  [SelectedCriteriaApiV1Importance.must_have]:
    SelectedCriteriaImportance.MustHave,
  [SelectedCriteriaApiV1Importance.nice_to_have]:
    SelectedCriteriaImportance.NiceToHave,
  [SelectedCriteriaApiV1Importance.super_nice_to_have]:
    SelectedCriteriaImportance.SuperNiceToHave,
};
