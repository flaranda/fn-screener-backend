import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';

@inversify.injectable()
export class CriteriaCompliancesRouter extends ExpressRouter {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceUuidRequestParamHandler,
    )
    private readonly criteriaComplianceUuidRequestParamHandler: ExpressRequestHandler,
    @inversify.inject(
      criteriaComplianceInjectionTypes.PatchCriteriaCompliancesCriteriaComplianceUuidRequestHandler,
    )
    private readonly patchCriteriaCompliancesCriteriaComplianceUuidRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'criteriaComplianceUuid',
      this.criteriaComplianceUuidRequestParamHandler.handler,
    );

    this.expressRouter
      .route('/:criteriaComplianceUuid')
      .patch(
        this.patchCriteriaCompliancesCriteriaComplianceUuidRequestHandler
          .handler,
      );
  }
}
