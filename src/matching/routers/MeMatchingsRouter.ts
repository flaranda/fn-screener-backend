import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { userInjectionTypes } from '../../user/inversify/userInjectionTypes';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';

@inversify.injectable()
export class MeMatchingsRouter extends ExpressRouter {
  constructor(
    @inversify.inject(userInjectionTypes.UserMiddleware)
    private readonly userMiddleware: ExpressRequestHandler,
    @inversify.inject(matchingInjectionTypes.GetUsersMeMatchingsRequestHandler)
    private readonly getUsersMeMatchingsRequestHandler: ExpressRequestHandler,
    @inversify.inject(matchingInjectionTypes.MatchingUuidRequestParamHandler)
    private readonly matchingRequestParamHandler: ExpressRequestParamHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'matchingUuid',
      this.matchingRequestParamHandler.handler,
    );

    this.expressRouter
      .route('/')
      .get([
        this.userMiddleware.handler,
        this.getUsersMeMatchingsRequestHandler.handler,
      ]);
  }
}
