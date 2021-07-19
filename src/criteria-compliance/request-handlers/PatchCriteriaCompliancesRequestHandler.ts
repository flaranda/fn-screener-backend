import express from 'express';
import * as inversify from 'inversify';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';
import { CriteriaComplianceApiV1 } from '../models/api/v1/CriteriaComplianceApiV1';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceUpdateQuery } from '../models/domain/CriteriaComplianceUpdateQuery';

@inversify.injectable()
export class PatchCriteriaCompliancesRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer,
    )
    private readonly patchV1CriteriaCompliancesRequestToCriteriaComplianceUpdateQueryTransformer: ITransformer<
      RequestWithContext,
      CriteriaComplianceUpdateQuery
    >,
    @inversify.inject(
      criteriaComplianceInjectionTypes.UpdateCriteriaComplianceInteractor,
    )
    private readonly updateCriteriaComplianceInteractor: IInteractor<
      CriteriaComplianceUpdateQuery,
      CriteriaCompliance
    >,
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceToCriteriaComplianceApiV1Transformer,
    )
    private readonly criteriaComplianceToCriteriaComplianceApiV1Transformer: ITransformer<
      CriteriaCompliance,
      CriteriaComplianceApiV1
    >,
  ) {
    super();
  }

  protected async handleV1(
    request: RequestWithContext,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    const criteriaComplianceUpdateQuery: CriteriaComplianceUpdateQuery =
      await this.patchV1CriteriaCompliancesRequestToCriteriaComplianceUpdateQueryTransformer.transform(
        request,
      );

    const criteriaCompliance: CriteriaCompliance =
      await this.updateCriteriaComplianceInteractor.interact(
        criteriaComplianceUpdateQuery,
      );

    const criteriaComplianceApiV1: CriteriaComplianceApiV1 =
      await this.criteriaComplianceToCriteriaComplianceApiV1Transformer.transform(
        criteriaCompliance,
      );

    response.json(criteriaComplianceApiV1);
  }
}
