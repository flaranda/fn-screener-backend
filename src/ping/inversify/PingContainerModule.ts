import * as inversify from 'inversify';

import { GetPingExpressRequestHandler } from '../request-handlers/GetPingExpressRequestHandler';
import { PingExpressRouter } from '../routers/PingExpressRouter';
import { pingInjectionTypes } from './pingInjectionTypes';

export class PingContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(pingInjectionTypes.GetPingExpressRequestHandler).to(
        GetPingExpressRequestHandler,
      );
      bind(pingInjectionTypes.PingExpressRouter).to(PingExpressRouter);
    };

    super(registry);
  }
}
