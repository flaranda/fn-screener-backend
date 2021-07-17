import * as inversify from 'inversify';

import { FindManyUserCriteriasInteractor } from '../interactors/FindManyUserCriteriasInteractor';
import { UserCriteriaMongoSchemaContainer } from '../models/mongo/UserCriteriaMongoSchemaContainer';
import { UserCriteriaMongoFindManyRepository } from '../repositories/mongo/UserCriteriaMongoFindManyRepository';
import { GetUsersMeUserCriteriasExpressRequestHandler } from '../request-handlers/express/GetUsersMeUserCriteriasExpressRequestHandler';
import { UserCriteriaMongoSeeder } from '../seeder/mongo/UserCriteriaMongoSeeder';
import { UserCriteriaToUserCriteriaApiV1Transformer } from '../transformers/api/v1/UserCriteriaToUserCriteriaApiV1Transformer';
import { UserCriteriaMongoDocumentToUserCriteriaTransformer } from '../transformers/mongo/UserCriteriaMongoDocumentToUserCriteriaTransformer';
import { userCriteriaInjectionTypes } from './userCriteriaInjectionTypes';

export class UserCriteriaContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(userCriteriaInjectionTypes.FindManyUserCriteriasInteractor).to(
        FindManyUserCriteriasInteractor,
      );
      bind(
        userCriteriaInjectionTypes.GetUsersMeUserCriteriasExpressRequestHandler,
      ).to(GetUsersMeUserCriteriasExpressRequestHandler);
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
      bind(
        userCriteriaInjectionTypes.UserCriteriaToUserCriteriaApiV1Transformer,
      ).to(UserCriteriaToUserCriteriaApiV1Transformer);
    };

    super(registry);
  }
}
