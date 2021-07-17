import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { userCriteriaInjectionTypes } from '../inversify/userCriteriaInjectionTypes';

@inversify.injectable()
export class MeUserCriteriasRouter extends ExpressRouter {
  constructor(
    @inversify.inject(
      userCriteriaInjectionTypes.GetUsersMeUserCriteriasExpressRequestHandler,
    )
    private readonly getUsersMeUserCriteriasRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter
      .route('/')
      .get(this.getUsersMeUserCriteriasRequestHandler.handler);
  }
}
