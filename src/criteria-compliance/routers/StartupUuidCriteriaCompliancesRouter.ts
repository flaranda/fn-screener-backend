import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';

@inversify.injectable()
export class StartupUuidCriteriaCompliancesRouter extends ExpressRouter {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.GetStartupsStartupUuidCriteriaCompliancesRequestHandler,
    )
    private readonly getStartupStartupUuidCriteriaCompliancesRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter
      .route('/')
      .get([
        this.getStartupStartupUuidCriteriaCompliancesRequestHandler.handler,
      ]);
  }
}
