import * as inversify from 'inversify';

import { criteriaComplianceInjectionTypes } from '../../criteria-compliance/inversify/criteriaComplianceInjectionTypes';
import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { startupInjectionTypes } from '../inversify/startupInjectionTypes';

@inversify.injectable()
export class StartupsRouter extends ExpressRouter {
  constructor(
    @inversify.inject(startupInjectionTypes.StartupUuidRequestParamHandler)
    private readonly startupUuidRequestParamHandler: ExpressRequestParamHandler,
    @inversify.inject(
      criteriaComplianceInjectionTypes.StartupUuidCriteriaCompliancesRouter,
    )
    private readonly startupUuidCriteriaCompliancesRouter: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'startupUuid',
      this.startupUuidRequestParamHandler.handler,
    );

    this.expressRouter.use(
      '/:startupUuid',
      this.startupUuidCriteriaCompliancesRouter.handler,
    );
  }
}
