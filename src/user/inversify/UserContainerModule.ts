import * as inversify from 'inversify';

import { FindOneUserInteractor } from '../interactors/FindOneUserInteractor';
import { UserMongoSchemaContainer } from '../models/mongo/UserMongoSchemaContainer';
import { UserMongoFindOneRepository } from '../repositories/mongo/UserMongoFindOneRepository';
import { UserMongoSeeder } from '../seeder/mongo/UserMongoSeeder';
import { UserMongoDocumentToUserTransformer } from '../transformers/mongo/UserMongoDocumentToUserTransformer';
import { userInjectionTypes } from './userInjectionTypes';

export class UserContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(userInjectionTypes.FindOneUserInteractor).to(FindOneUserInteractor);
      bind(userInjectionTypes.UserMongoDocumentToUserTransformer).to(
        UserMongoDocumentToUserTransformer,
      );
      bind(userInjectionTypes.UserMongoFindOneRepository).to(
        UserMongoFindOneRepository,
      );
      bind(userInjectionTypes.UserMongoSchemaContainer).to(
        UserMongoSchemaContainer,
      );
      bind(userInjectionTypes.UserMongoSeeder).to(UserMongoSeeder);
    };

    super(registry);
  }
}
