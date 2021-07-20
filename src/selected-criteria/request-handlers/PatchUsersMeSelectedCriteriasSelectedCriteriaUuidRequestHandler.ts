import express from 'express';
import * as inversify from 'inversify';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteriaApiV1 } from '../models/api/v1/SelectedCriteriaApiV1';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaUpdateQuery } from '../models/domain/SelectedCriteriaUpdateQuery';

@inversify.injectable()
export class PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer,
    )
    private readonly patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer: ITransformer<
      RequestWithContext,
      SelectedCriteriaUpdateQuery
    >,
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
      await this.patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.transform(
        request,
      );

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
}
