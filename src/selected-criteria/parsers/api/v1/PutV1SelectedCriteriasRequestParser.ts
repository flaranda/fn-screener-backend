import * as inversify from 'inversify';

import { hasValue } from '../../../../common/helpers/hasValue';
import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { ITypeGuard } from '../../../../common/interfaces/ITypeGuard';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { selectedCriteriaInjectionTypes } from '../../../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';

@inversify.injectable()
export class PutV1SelectedCriteriasRequestParser
  implements IRequestParser<SelectedCriteriaApiV1UpdateQuery>
{
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaApiV1UpdateQueryTypeGuard,
    )
    private readonly selectedCriteriaApiV1UpdateQueryTypeGuard: ITypeGuard<SelectedCriteriaApiV1UpdateQuery>,
  ) {}

  public async parse(
    request: RequestWithContext,
  ): Promise<SelectedCriteriaApiV1UpdateQuery> {
    const body: unknown = request.body;

    if (this.selectedCriteriaApiV1UpdateQueryTypeGuard.is(body)) {
      const selectedCriteriaApiV1UpdateQuery: SelectedCriteriaApiV1UpdateQuery =
        {
          uuid: body.uuid,
        };

      if (hasValue(body.importance)) {
        selectedCriteriaApiV1UpdateQuery.importance = body.importance;
      }

      return selectedCriteriaApiV1UpdateQuery;
    } else {
      throw new Error(
        'Could not parse Request to SelectedCriteriaApiV1UpdateQuery',
      );
    }
  }
}
