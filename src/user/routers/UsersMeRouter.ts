import * as inversify from 'inversify';

import { selectedCriteriaInjectionTypes } from '../../selected-criteria/inversify/selectedCriteriaInjectionTypes';
import { ExpressRouter } from '../../server/modules/ExpressRouter';

@inversify.injectable()
export class UsersMeRouter extends ExpressRouter {
  constructor(
    @inversify.inject(selectedCriteriaInjectionTypes.MeSelectedCriteriasRouter)
    private readonly meSelectedCriteriasRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use(
      '/selected-criterias',
      this.meSelectedCriteriasRouter.handler,
    );
  }
}
