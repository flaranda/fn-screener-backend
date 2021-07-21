import * as inversify from 'inversify';

import { criteriaComplianceInjectionTypes } from '../../criteria-compliance/inversify/criteriaComplianceInjectionTypes';
import { criteriaInjectionTypes } from '../../criteria/inversify/criteriaInjectionTypes';
import { startupInjectionTypes } from '../../startup/inversify/startupInjectionTypes';
import { userInjectionTypes } from '../../user/inversify/userInjectionTypes';
import { ExpressRouter } from '../modules/ExpressRouter';

inversify.injectable();
export class ApiRouter extends ExpressRouter {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriasRouter)
    private readonly criteriasRouter: ExpressRouter,
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaCompliancesRouter,
    )
    private readonly criteriaCompliancesRouter: ExpressRouter,
    @inversify.inject(userInjectionTypes.UsersRouter)
    private readonly usersRouter: ExpressRouter,
    @inversify.inject(startupInjectionTypes.StartupsRouter)
    private readonly startupsRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use('/criterias', this.criteriasRouter.handler);
    this.expressRouter.use(
      '/criteria-compliances',
      this.criteriaCompliancesRouter.handler,
    );
    this.expressRouter.use('/startups', this.startupsRouter.handler);
    this.expressRouter.use('/users', this.usersRouter.handler);
  }
}
