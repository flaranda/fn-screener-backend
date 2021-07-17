import * as inversify from 'inversify';

import { ServerConfig } from '../configs/ServerConfig';
import { ExpressServer } from '../modules/express/ExpressServer';
import { ApiVersionExpressRequestParamHandler } from '../request-handlers/ApiVersionExpressRequestParamHandler';
import { ApiExpressRouter } from '../routers/express/ApiExpressRouter';
import { MainExpressRouter } from '../routers/express/MainExpressRouter';
import { serverInjectionTypes } from './serverInjectionTypes';

export class ServerContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(serverInjectionTypes.ApiExpressRouter).to(ApiExpressRouter);
      bind(serverInjectionTypes.ApiVersionExpressRequestParamHandler).to(
        ApiVersionExpressRequestParamHandler,
      );
      bind(serverInjectionTypes.ExpressServer)
        .to(ExpressServer)
        .inSingletonScope();
      bind(serverInjectionTypes.MainExpressRouter).to(MainExpressRouter);
      bind(serverInjectionTypes.ServerConfig)
        .to(ServerConfig)
        .inSingletonScope();
    };

    super(registry);
  }
}
