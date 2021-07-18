import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { userInjectionTypes } from '../../user/inversify/userInjectionTypes';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';

@inversify.injectable()
export class MeSelectedCriteriasRouter extends ExpressRouter {
  constructor(
    @inversify.inject(userInjectionTypes.UserMiddleware)
    private readonly userMiddleware: ExpressRequestHandler,
    @inversify.inject(
      selectedCriteriaInjectionTypes.GetUsersMeSelectedCriteriasExpressRequestHandler,
    )
    private readonly getUsersMeSelectedCriteriasRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter
      .route('/')
      .get([
        this.userMiddleware.handler,
        this.getUsersMeSelectedCriteriasRequestHandler.handler,
      ]);
  }
}
