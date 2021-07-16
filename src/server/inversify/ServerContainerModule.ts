import * as inversify from 'inversify';

import { ServerConfig } from '../configs/ServerConfig';
import { ExpressServer } from '../modules/ExpressServer';
import { serverInjectionTypes } from './serverInjectionTypes';

export class ServerContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(serverInjectionTypes.ExpressServer)
        .to(ExpressServer)
        .inSingletonScope();
      bind(serverInjectionTypes.ServerConfig)
        .to(ServerConfig)
        .inSingletonScope();
    };

    super(registry);
  }
}
