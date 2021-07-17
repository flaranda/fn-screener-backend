import * as inversify from 'inversify';

import { UserCriteriaMongoSchemaContainer } from '../models/mongo/UserCriteriaMongoSchemaContainer';
import { UserCriteriaMongoFindManyRepository } from '../repositories/mongo/UserCriteriaMongoFindManyRepository';
import { UserCriteriaMongoSeeder } from '../seeder/mongo/UserCriteriaMongoSeeder';
import { UserCriteriaMongoDocumentToUserCriteriaTransformer } from '../transformers/mongo/UserCriteriaMongoDocumentToUserCriteriaTransformer';
import { userCriteriaInjectionTypes } from './userCriteriaInjectionTypes';

export class UserCriteriaContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(
        userCriteriaInjectionTypes.UserCriteriaMongoDocumentToUserCriteriaTransformer,
      ).to(UserCriteriaMongoDocumentToUserCriteriaTransformer);
      bind(userCriteriaInjectionTypes.UserCriteriaMongoFindManyRepository).to(
        UserCriteriaMongoFindManyRepository,
      );
      bind(userCriteriaInjectionTypes.UserCriteriaMongoSchemaContainer).to(
        UserCriteriaMongoSchemaContainer,
      );
      bind(userCriteriaInjectionTypes.UserCriteriaMongoSeeder).to(
        UserCriteriaMongoSeeder,
      );
    };

    super(registry);
  }
}
