import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';

@inversify.injectable()
export class MeSelectedCriteriasRouter extends ExpressRouter {
  constructor(
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
      .get(this.getUsersMeSelectedCriteriasRequestHandler.handler);
  }
}
