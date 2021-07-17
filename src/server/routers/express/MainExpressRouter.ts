import * as inversify from 'inversify';

import { pingInjectionTypes } from '../../../ping/inversify/pingInjectionTypes';
import { serverInjectionTypes } from '../../inversify/serverInjectionTypes';
import { ExpressRequestParamHandler } from '../../modules/express/ExpressRequestParamHandler';
import { ExpressRouter } from '../../modules/express/ExpressRouter';

inversify.injectable();
export class MainExpressRouter extends ExpressRouter {
  constructor(
    @inversify.inject(serverInjectionTypes.ApiVersionExpressRequestParamHandler)
    private readonly apiVersionRequestParamHandler: ExpressRequestParamHandler,
    @inversify.inject(pingInjectionTypes.PingExpressRouter)
    private readonly pingRouter: ExpressRouter,
    @inversify.inject(serverInjectionTypes.ApiExpressRouter)
    private readonly apiRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'apiVersion',
      this.apiVersionRequestParamHandler.handler,
    );

    this.expressRouter.use('/', this.pingRouter.handler);
    this.expressRouter.use('/:apiVersion', this.apiRouter.handler);
  }
}
