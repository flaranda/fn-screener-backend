import { EntityMongoDocument } from '../../../common/models/mongo/EntityMongoDocument';
import { SelectedCriteriaMongo } from './SelectedCriteriaMongo';

export type SelectedCriteriaMongoDocument = SelectedCriteriaMongo &
  EntityMongoDocument;
