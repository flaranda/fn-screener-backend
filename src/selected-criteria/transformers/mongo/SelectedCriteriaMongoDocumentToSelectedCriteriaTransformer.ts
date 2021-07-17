import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { SelectedCriteria } from '../../models/domain/SelectedCriteria';
import { SelectedCriteriaMongoDocument } from '../../models/mongo/SelectedCriteriaMongoDocument';
import { selectedCriteriaMongoImportanceToSelectedCriteriaImportanceMap } from '../../models/mongo/selectedCriteriaMongoImportanceToSelectedCriteriaImportanceMap';

@inversify.injectable()
export class SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer
  implements ITransformer<SelectedCriteriaMongoDocument, SelectedCriteria>
{
  public async transform(
    selectedCriteriaMongo: SelectedCriteriaMongoDocument,
  ): Promise<SelectedCriteria> {
    const selectedCriteria: SelectedCriteria = {
      createdAt: selectedCriteriaMongo.created_at,
      criteriaUuid: selectedCriteriaMongo.criteria_uuid,
      importance:
        selectedCriteriaMongoImportanceToSelectedCriteriaImportanceMap[
          selectedCriteriaMongo.importance
        ],
      updatedAt: selectedCriteriaMongo.updated_at,
      userUuid: selectedCriteriaMongo.user_uuid,
      uuid: selectedCriteriaMongo.uuid,
    };

    return selectedCriteria;
  }
}
