import { EntityUpdateQuery } from '../../../common/models/domain/EntityUpdateQuery';
import { SelectedCriteriaImportance } from './SelectedCriteriaImportance';

export interface SelectedCriteriaUpdateQuery extends EntityUpdateQuery {
  importance?: SelectedCriteriaImportance;
}
