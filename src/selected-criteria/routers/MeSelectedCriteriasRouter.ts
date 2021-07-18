import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
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
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaRequestParamHandler,
    )
    private readonly selectedCriteriaRequestParamHandler: ExpressRequestParamHandler,
    @inversify.inject(
      selectedCriteriaInjectionTypes.PutUsersMeSelectedCriteriasRequestHandler,
    )
    private readonly putUsersMeSelectedCriteriasRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      ':selectedCriteriaId',
      this.selectedCriteriaRequestParamHandler.handler,
    );

    this.expressRouter
      .route('/')
      .get([
        this.userMiddleware.handler,
        this.getUsersMeSelectedCriteriasRequestHandler.handler,
      ]);

    this.expressRouter
      .route('/:selectedCriteriaId')
      .put([
        this.userMiddleware.handler,
        this.putUsersMeSelectedCriteriasRequestHandler.handler,
      ]);
  }
}
