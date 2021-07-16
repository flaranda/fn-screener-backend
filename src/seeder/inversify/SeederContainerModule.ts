import * as inversify from 'inversify';

import { MongoSeeder } from '../modules/mongo/MongoSeeder';
import { seederInjectionTypes } from './seederInjectionTypes';

export class SeederContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(seederInjectionTypes.MongoSeeder).to(MongoSeeder);
    };

    super(registry);
  }
}
