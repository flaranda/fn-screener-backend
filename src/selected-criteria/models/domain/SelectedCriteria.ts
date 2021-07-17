import { Entity } from '../../../common/models/domain/Entity';
import { SelectedCriteriaImportance } from './SelectedCriteriaImportance';

export interface SelectedCriteria extends Entity {
  readonly criteriaUuid: string;
  readonly importance: SelectedCriteriaImportance;
  readonly userUuid: string;
}
