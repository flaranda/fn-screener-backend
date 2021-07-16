import * as inversify from 'inversify';

import { MongoConfig } from '../configs/MongoConfig';
import { MongoDatasource } from '../datasources/MongoDatasource';
import { mongoInjectionTypes } from './mongoInjectionTypes';

export class MongoContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(mongoInjectionTypes.MongoConfig).to(MongoConfig).inSingletonScope();
      bind(mongoInjectionTypes.MongoDatasource)
        .to(MongoDatasource)
        .inSingletonScope();
    };

    super(registry);
  }
}
