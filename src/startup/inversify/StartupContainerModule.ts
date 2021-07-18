import * as inversify from 'inversify';

import { StartupMongoSchemaContainer } from '../models/mongo/StartupMongoSchemaContainer';
import { StartupMongoSeeder } from '../seeder/mongo/StartupMongoSeeder';
import { StartupMongoDocumentToStartupTransformer } from '../transformers/mongo/StartupMongoDocumentToStartupTransformer';
import { startupInjectionTypes } from './startupInjectionTypes';

export class StartupContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(startupInjectionTypes.StartupMongoDocumentToStartupTransformer).to(
        StartupMongoDocumentToStartupTransformer,
      );
      bind(startupInjectionTypes.StartupMongoSchemaContainer).to(
        StartupMongoSchemaContainer,
      );
      bind(startupInjectionTypes.StartupMongoSeeder).to(StartupMongoSeeder);
    };

    super(registry);
  }
}
