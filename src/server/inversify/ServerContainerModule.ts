import * as inversify from 'inversify';

import { ServerConfig } from '../configs/ServerConfig';
import { ExpressServer } from '../modules/ExpressServer';
import { ApiVersionExpressRequestParamHandler } from '../request-handlers/ApiVersionExpressRequestParamHandler';
import { ApiRouter } from '../routers/ApiRouter';
import { MainRouter } from '../routers/MainRouter';
import { serverInjectionTypes } from './serverInjectionTypes';

export class ServerContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(serverInjectionTypes.ApiRouter).to(ApiRouter);
      bind(serverInjectionTypes.ApiVersionExpressRequestParamHandler).to(
        ApiVersionExpressRequestParamHandler,
      );
      bind(serverInjectionTypes.ExpressServer)
        .to(ExpressServer)
        .inSingletonScope();
      bind(serverInjectionTypes.MainRouter).to(MainRouter);
      bind(serverInjectionTypes.ServerConfig)
        .to(ServerConfig)
        .inSingletonScope();
    };

    super(registry);
  }
}
