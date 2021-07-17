import * as inversify from 'inversify';

import { criteriaInjectionTypes } from '../../../criteria/inversify/criteriaInjectionTypes';
import { ExpressRouter } from '../../modules/express/ExpressRouter';

inversify.injectable();
export class ApiExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriasExpressRouter)
    private readonly criteriasRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use('/criterias', this.criteriasRouter.handler);
  }
}
