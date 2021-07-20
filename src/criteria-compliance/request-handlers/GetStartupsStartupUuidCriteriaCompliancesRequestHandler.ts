import express from 'express';
import * as inversify from 'inversify';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';
import { CriteriaComplianceApiV1 } from '../models/api/v1/CriteriaComplianceApiV1';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../models/domain/CriteriaComplianceFindQuery';

@inversify.injectable()
export class GetStartupsStartupUuidCriteriaCompliancesRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer,
    )
    private readonly getV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer: ITransformer<
      RequestWithContext,
      CriteriaComplianceFindQuery
    >,
    @inversify.inject(
      criteriaComplianceInjectionTypes.FindManyCriteriaCompliancesInteractor,
    )
    private readonly findManyCriteriaCompliancesInteractor: IInteractor<
      CriteriaComplianceFindQuery,
      CriteriaCompliance[]
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
    const criteriaComplianceFindQuery: CriteriaComplianceFindQuery =
      await this.getV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform(
        request,
      );

    const criteriaCompliances: CriteriaCompliance[] =
      await this.findManyCriteriaCompliancesInteractor.interact(
        criteriaComplianceFindQuery,
      );

    const criteriaCompliancesApiV1: CriteriaComplianceApiV1[] =
      await Promise.all(
        criteriaCompliances.map(
          async (criteriaCompliance: CriteriaCompliance) => {
            const criteriaComplianceApiV1: CriteriaComplianceApiV1 =
              await this.criteriaComplianceToCriteriaComplianceApiV1Transformer.transform(
                criteriaCompliance,
              );

            return criteriaComplianceApiV1;
          },
        ),
      );

    response.json(criteriaCompliancesApiV1);
  }
}
