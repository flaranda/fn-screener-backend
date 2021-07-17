import { SelectedCriteriaImportance } from '../domain/SelectedCriteriaImportance';
import { SelectedCriteriaMongoImportance } from './SelectedCriteriaMongoImportance';

export const selectedCriteriaImportanceToSelectedCriteriaMongoImportanceMap: {
  [TKey in SelectedCriteriaImportance]: SelectedCriteriaMongoImportance;
} = {
  [SelectedCriteriaImportance.MustHave]:
    SelectedCriteriaMongoImportance.must_have,
  [SelectedCriteriaImportance.NiceToHave]:
    SelectedCriteriaMongoImportance.nice_to_have,
  [SelectedCriteriaImportance.SuperNiceToHave]:
    SelectedCriteriaMongoImportance.super_nice_to_have,
};
