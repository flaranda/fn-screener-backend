import * as inversify from 'inversify';

import { hasValue } from '../../../../common/helpers/hasValue';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap } from '../../../models/api/v1/selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap';
import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';
import { SelectedCriteriaUpdateQuery } from '../../../models/domain/SelectedCriteriaUpdateQuery';

@inversify.injectable()
export class SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer
  implements
    ITransformer<SelectedCriteriaApiV1UpdateQuery, SelectedCriteriaUpdateQuery>
{
  public async transform(
    selectedCriteriaApiV1UpdateQuery: SelectedCriteriaApiV1UpdateQuery,
  ): Promise<SelectedCriteriaUpdateQuery> {
    const selectedCriteriaUpdateQuery: SelectedCriteriaUpdateQuery = {
      uuid: selectedCriteriaApiV1UpdateQuery.uuid,
    };

    if (hasValue(selectedCriteriaApiV1UpdateQuery.importance)) {
      selectedCriteriaUpdateQuery.importance =
        selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap[
          selectedCriteriaApiV1UpdateQuery.importance
        ];
    }

    return selectedCriteriaUpdateQuery;
  }
}
