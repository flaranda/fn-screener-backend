import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { hasValue } from '../../common/helpers/hasValue';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { IRequestParser } from '../../common/interfaces/IRequestParser';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteriaApiV1 } from '../models/api/v1/SelectedCriteriaApiV1';
import { selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap } from '../models/api/v1/selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap';
import { SelectedCriteriaApiV1UpdateQuery } from '../models/api/v1/SelectedCriteriaApiV1UpdateQuery';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaUpdateQuery } from '../models/domain/SelectedCriteriaUpdateQuery';

@inversify.injectable()
export class PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestParser,
    )
    private readonly patchV1SelectedCriteriasRequestParser: IRequestParser<SelectedCriteriaApiV1UpdateQuery>,
    @inversify.inject(
      selectedCriteriaInjectionTypes.UpdateSelectedCriteriaInteractor,
    )
    private readonly updateSelectedCriteriaInteractor: IInteractor<
      SelectedCriteriaUpdateQuery,
      SelectedCriteria
    >,
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaToSelectedCriteriaApiV1Transformer,
    )
    private readonly selectedCriteriaToSelectedCriteriaApiV1Transformer: ITransformer<
      SelectedCriteria,
      SelectedCriteriaApiV1
    >,
  ) {
    super();
  }

  protected async handleV1(
    request: RequestWithContext,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    const selectedCriteriaUpdateQuery: SelectedCriteriaUpdateQuery =
      await this.transformV1RequestToSelectedCriteriaUpdateQuery(request);

    const selectedCriteria: SelectedCriteria =
      await this.updateSelectedCriteriaInteractor.interact(
        selectedCriteriaUpdateQuery,
      );

    const selectedCriteriaApiV1: SelectedCriteriaApiV1 =
      await this.selectedCriteriaToSelectedCriteriaApiV1Transformer.transform(
        selectedCriteria,
      );

    response.json(selectedCriteriaApiV1);
  }

  private async transformV1RequestToSelectedCriteriaUpdateQuery(
    request: RequestWithContext,
  ): Promise<SelectedCriteriaUpdateQuery> {
    const selectCriteriaApiV1UpdateQuery: SelectedCriteriaApiV1UpdateQuery =
      await this.patchV1SelectedCriteriasRequestParser.parse(request);

    const requestContext: RequestContext = getRequestContext(request);

    const selectedCriteriaUpdateQuery: SelectedCriteriaUpdateQuery = {
      uuid: requestContext.selectedCriteria?.uuid as string,
    };

    if (hasValue(selectCriteriaApiV1UpdateQuery.importance)) {
      selectedCriteriaUpdateQuery.importance =
        selectedCriteriaApiV1ImportanceToSelectedCriteriaImportanceMap[
          selectCriteriaApiV1UpdateQuery.importance
        ];
    }

    return selectedCriteriaUpdateQuery;
  }
}
