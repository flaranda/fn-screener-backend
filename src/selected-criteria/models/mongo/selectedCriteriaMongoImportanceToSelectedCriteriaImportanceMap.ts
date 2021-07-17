import { SelectedCriteriaImportance } from '../domain/SelectedCriteriaImportance';
import { SelectedCriteriaMongoImportance } from './SelectedCriteriaMongoImportance';

export const selectedCriteriaMongoImportanceToSelectedCriteriaImportanceMap: {
  [TKey in SelectedCriteriaMongoImportance]: SelectedCriteriaImportance;
} = {
  [SelectedCriteriaMongoImportance.must_have]:
    SelectedCriteriaImportance.MustHave,
  [SelectedCriteriaMongoImportance.nice_to_have]:
    SelectedCriteriaImportance.NiceToHave,
  [SelectedCriteriaMongoImportance.super_nice_to_have]:
    SelectedCriteriaImportance.SuperNiceToHave,
};
