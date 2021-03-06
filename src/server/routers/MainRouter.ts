import * as inversify from 'inversify';

import { pingInjectionTypes } from '../../ping/inversify/pingInjectionTypes';
import { serverInjectionTypes } from '../inversify/serverInjectionTypes';
import { ExpressRequestParamHandler } from '../modules/ExpressRequestParamHandler';
import { ExpressRouter } from '../modules/ExpressRouter';

inversify.injectable();
export class MainRouter extends ExpressRouter {
  constructor(
    @inversify.inject(serverInjectionTypes.ApiVersionExpressRequestParamHandler)
    private readonly apiVersionRequestParamHandler: ExpressRequestParamHandler,
    @inversify.inject(pingInjectionTypes.PingExpressRouter)
    private readonly pingRouter: ExpressRouter,
    @inversify.inject(serverInjectionTypes.ApiRouter)
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
