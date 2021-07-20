import * as inversify from 'inversify';

import { getRequestContext } from '../../../../common/helpers/getRequestContext';
import { hasValue } from '../../../../common/helpers/hasValue';
import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { selectedCriteriaInjectionTypes } from '../../../inversify/selectedCriteriaInjectionTypes';
import { selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap } from '../../../models/api/v1/selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap';
import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';
import { SelectedCriteria } from '../../../models/domain/SelectedCriteria';
import { SelectedCriteriaUpdateQuery } from '../../../models/domain/SelectedCriteriaUpdateQuery';

@inversify.injectable()
export class PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer
  implements ITransformer<RequestWithContext, SelectedCriteriaUpdateQuery>
{
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestParser,
    )
    private readonly patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser: IRequestParser<SelectedCriteriaApiV1UpdateQuery>,
  ) {}

  public async transform(
    request: RequestWithContext,
  ): Promise<SelectedCriteriaUpdateQuery> {
    const requestContext: RequestContext = getRequestContext(request);

    const selectedCriteria: SelectedCriteria | undefined =
      requestContext.selectedCriteria;

    let selectedCriteriaUpdateQuery: SelectedCriteriaUpdateQuery;

    if (hasValue(selectedCriteria)) {
      const selectedCriteriaApiV1UpdateQuery: SelectedCriteriaApiV1UpdateQuery =
        await this.patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser.parse(
          request,
        );

      selectedCriteriaUpdateQuery = {
        uuid: selectedCriteria.uuid,
      };

      if (hasValue(selectedCriteriaApiV1UpdateQuery.importance)) {
        selectedCriteriaUpdateQuery.importance =
          selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap[
            selectedCriteriaApiV1UpdateQuery.importance
          ];
      }
    } else {
      throw new Error('SelectedCriteria not present in Request');
    }

    return selectedCriteriaUpdateQuery;
  }
}
