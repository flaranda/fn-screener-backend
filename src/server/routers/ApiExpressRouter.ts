import * as inversify from 'inversify';

import { criteriaComplianceInjectionTypes } from '../../criteria-compliance/inversify/criteriaComplianceInjectionTypes';
import { criteriaInjectionTypes } from '../../criteria/inversify/criteriaInjectionTypes';
import { userInjectionTypes } from '../../user/inversify/userInjectionTypes';
import { ExpressRouter } from '../modules/ExpressRouter';

inversify.injectable();
export class ApiExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriasRouter)
    private readonly criteriasRouter: ExpressRouter,
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaCompliancesRouter,
    )
    private readonly criteriaCompliancesRouter: ExpressRouter,
    @inversify.inject(userInjectionTypes.UsersRouter)
    private readonly usersRouter: ExpressRouter,
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
    this.expressRouter.use('/users', this.usersRouter.handler);
  }
}
