import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';

@inversify.injectable()
export class CriteriaCompliancesRouter extends ExpressRouter {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceRequestParamHandler,
    )
    private readonly criteriaComplianceRequestParamHandler: ExpressRequestHandler,
    @inversify.inject(
      criteriaComplianceInjectionTypes.PatchCriteriaCompliancesRequestHandler,
    )
    private readonly patchCriteriaCompliancesRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'criteriaComplianceUuid',
      this.criteriaComplianceRequestParamHandler.handler,
    );

    this.expressRouter
      .route('/:criteriaComplianceUuid')
      .patch(this.patchCriteriaCompliancesRequestHandler.handler);
  }
}
