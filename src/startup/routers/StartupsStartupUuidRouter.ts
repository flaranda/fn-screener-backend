import * as inversify from 'inversify';

import { criteriaComplianceInjectionTypes } from '../../criteria-compliance/inversify/criteriaComplianceInjectionTypes';
import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';

@inversify.injectable()
export class StartupsStartupUuidRouter extends ExpressRouter {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.StartupUuidCriteriaCompliancesRouter,
    )
    private readonly startupUuidCriteriaCompliancesRouter: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use(
      '/criteria-compliances',
      this.startupUuidCriteriaCompliancesRouter.handler,
    );
  }
}
