import * as inversify from 'inversify';

import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { startupInjectionTypes } from '../inversify/startupInjectionTypes';

@inversify.injectable()
export class StartupsRouter extends ExpressRouter {
  constructor(
    @inversify.inject(startupInjectionTypes.StartupUuidRequestParamHandler)
    private readonly startupUuidRequestParamHandler: ExpressRequestParamHandler,
    @inversify.inject(startupInjectionTypes.StartupsStartupUuidRouter)
    private readonly startupsStartupUuidRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.param(
      'startupUuid',
      this.startupUuidRequestParamHandler.handler,
    );

    this.expressRouter.use(
      '/:startupUuid',
      this.startupsStartupUuidRouter.handler,
    );
  }
}
