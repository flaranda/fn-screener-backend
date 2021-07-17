import * as inversify from 'inversify';

import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { userCriteriaInjectionTypes } from '../../user-criteria/inversify/userCriteriaInjectionTypes';

@inversify.injectable()
export class UsersMeRouter extends ExpressRouter {
  constructor(
    @inversify.inject(userCriteriaInjectionTypes.MeUserCriteriasRouter)
    private readonly meUserCriteriasRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use('/criterias', this.meUserCriteriasRouter.handler);
  }
}
