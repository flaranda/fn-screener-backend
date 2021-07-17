import * as inversify from 'inversify';

import { pingInjectionTypes } from '../../../ping/inversify/pingInjectionTypes';
import { ExpressRouter } from '../../modules/express/ExpressRouter';

inversify.injectable();
export class MainExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(pingInjectionTypes.PingExpressRouter)
    private readonly pingRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use('/', this.pingRouter.handler);
  }
}
