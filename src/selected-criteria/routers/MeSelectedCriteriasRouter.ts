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
      selectedCriteriaInjectionTypes.GetUsersMeSelectedCriteriasRequestHandler,
    )
    private readonly getUsersMeSelectedCriteriasRequestHandler: ExpressRequestHandler,
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaUuidRequestParamHandler,
    )
    private readonly selectedCriteriaUuidRequestParamHandler: ExpressRequestParamHandler,
    @inversify.inject(
      selectedCriteriaInjectionTypes.PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler,
    )
    private readonly patchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'selectedCriteriaUuid',
      this.selectedCriteriaUuidRequestParamHandler.handler,
    );

    this.expressRouter
      .route('/')
      .get([
        this.userMiddleware.handler,
        this.getUsersMeSelectedCriteriasRequestHandler.handler,
      ]);

    this.expressRouter
      .route('/:selectedCriteriaUuid')
      .patch([
        this.userMiddleware.handler,
        this.patchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler
          .handler,
      ]);
  }
}
