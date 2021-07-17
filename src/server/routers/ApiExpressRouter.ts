import * as inversify from 'inversify';

import { criteriaInjectionTypes } from '../../criteria/inversify/criteriaInjectionTypes';
import { userInjectionTypes } from '../../user/inversify/userInjectionTypes';
import { ExpressRouter } from '../modules/ExpressRouter';

inversify.injectable();
export class ApiExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriasExpressRouter)
    private readonly criteriasRouter: ExpressRouter,
    @inversify.inject(userInjectionTypes.UsersRouter)
    private readonly usersRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use('/criterias', this.criteriasRouter.handler);
    this.expressRouter.use('/users', this.usersRouter.handler);
  }
}
