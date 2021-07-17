import * as inversify from 'inversify';

import { ExpressRequestHandler } from '../../../server/modules/express/ExpressRequestHandler';
import { ExpressRouter } from '../../../server/modules/express/ExpressRouter';
import { pingInjectionTypes } from '../../inversify/pingInjectionTypes';

@inversify.injectable()
export class PingExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(pingInjectionTypes.GetPingExpressRequestHandler)
    private readonly getPingRequestHandler: ExpressRequestHandler,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.route('/').get(this.getPingRequestHandler.handler);
  }
}
