import * as inversify from 'inversify';

import { MongoConfig } from '../configs/MongoConfig';
import { mongoInjectionTypes } from './mongoInjectionTypes';

export class MongoContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(mongoInjectionTypes.MongoConfig).to(MongoConfig).inSingletonScope();
    };

    super(registry);
  }
}
