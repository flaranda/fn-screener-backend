import * as inversify from 'inversify';

import { ExpressServer } from '../modules/ExpressServer';
import { serverInjectionTypes } from './serverInjectionTypes';

export class ServerContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(serverInjectionTypes.ExpressServer).to(ExpressServer);
    };

    super(registry);
  }
}
