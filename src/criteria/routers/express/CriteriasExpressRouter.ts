import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../../server/modules/express/ExpressRequestHandler';
import { ExpressRouter } from '../../../server/modules/express/ExpressRouter';
import { criteriaInjectionTypes } from '../../inversify/criteriaInjectionTypes';

@inversify.injectable()
export class CriteriasExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(criteriaInjectionTypes.GetCriteriasExpressRequestHandler)
    private readonly getCriteriasRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.route('/').get(this.getCriteriasRequestHandler.handler);
  }
}
