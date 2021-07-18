import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../models/domain/CriteriaComplianceFindQuery';

@inversify.injectable()
export class CriteriaComplianceRequestParamHandler extends ExpressRequestParamHandler {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.FindOneCriteriaComplianceInteractor,
    )
    private readonly findOneCriteriaComplianceInteractor: IInteractor<
      CriteriaComplianceFindQuery,
      CriteriaCompliance
    >,
  ) {
    super();
  }

  protected async handle(
    request: RequestWithContext,
    _response: express.Response,
    next: express.NextFunction,
    param: string,
  ): Promise<void> {
    const criteriaComplianceFindQuery: CriteriaComplianceFindQuery = {
      uuid: param,
    };

    const criteriaCompliance: CriteriaCompliance =
      await this.findOneCriteriaComplianceInteractor.interact(
        criteriaComplianceFindQuery,
      );

    const requestContext: RequestContext = getRequestContext(request);

    requestContext.criteriaCompliance = criteriaCompliance;

    next();
  }
}
