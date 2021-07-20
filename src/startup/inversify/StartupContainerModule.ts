import * as inversify from 'inversify';

import { FindOneStartupInteractor } from '../interactors/FindOneStartupInteractor';
import { StartupMongoSchemaContainer } from '../models/mongo/StartupMongoSchemaContainer';
import { StartupMongoFindOneRepository } from '../repositories/mongo/StartupMongoFindOneRepository';
import { StartupUuidRequestParamHandler } from '../request-handlers/StartupUuidRequestParamHandler';
import { StartupMongoSeeder } from '../seeder/mongo/StartupMongoSeeder';
import { StartupMongoDocumentToStartupTransformer } from '../transformers/mongo/StartupMongoDocumentToStartupTransformer';
import { startupInjectionTypes } from './startupInjectionTypes';

export class StartupContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(startupInjectionTypes.FindOneStartupInteractor).to(
        FindOneStartupInteractor,
      );
      bind(startupInjectionTypes.StartupMongoDocumentToStartupTransformer).to(
        StartupMongoDocumentToStartupTransformer,
      );
      bind(startupInjectionTypes.StartupMongoFindOneRepository).to(
        StartupMongoFindOneRepository,
      );
      bind(startupInjectionTypes.StartupMongoSchemaContainer).to(
        StartupMongoSchemaContainer,
      );
      bind(startupInjectionTypes.StartupMongoSeeder).to(StartupMongoSeeder);
      bind(startupInjectionTypes.StartupUuidRequestParamHandler).to(
        StartupUuidRequestParamHandler,
      );
    };

    super(registry);
  }
}
