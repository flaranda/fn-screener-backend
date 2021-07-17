import express from 'express';
import * as inversify from 'inversify';

import { IInteractor } from '../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../common/interfaces/ITransformer';
import { ExpressRequest } from '../../../server/models/express/ExpressRequest';
import { ApiExpressRequestHandler } from '../../../server/modules/express/ApiExpressRequestHandler';
import { criteriaInjectionTypes } from '../../inversify/criteriaInjectionTypes';
import { CriteriaApiV1 } from '../../models/api/v1/CriteriaApiV1';
import { Criteria } from '../../models/domain/Criteria';
import { CriteriaFindQuery } from '../../models/domain/CriteriaFindQuery';

@inversify.injectable()
export class GetCriteriasExpressRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(criteriaInjectionTypes.FindManyCriteriasInteractor)
    private readonly findManyCriteriasInteractor: IInteractor<
      CriteriaFindQuery,
      Criteria[]
    >,
    @inversify.inject(criteriaInjectionTypes.CriteriaToCriteriaApiV1Transformer)
    private readonly criteriaToCriteriaApiV1Transformer: ITransformer<
      Criteria,
      CriteriaApiV1
    >,
  ) {
    super();
  }

  protected async handleV1(
    _request: ExpressRequest,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    const criterias: Criteria[] =
      await this.findManyCriteriasInteractor.interact({});

    const criteriasApiV1: CriteriaApiV1[] = await Promise.all(
      criterias.map(async (criteria: Criteria) => {
        const criteriaApiV1: CriteriaApiV1 =
          await this.criteriaToCriteriaApiV1Transformer.transform(criteria);

        return criteriaApiV1;
      }),
    );

    response.json(criteriasApiV1);
  }
}
