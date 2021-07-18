import * as inversify from 'inversify';

import { FindOneUserInteractor } from '../interactors/FindOneUserInteractor';
import { UserMiddleware } from '../middlewares/UserMiddleware';
import { UserMongoSchemaContainer } from '../models/mongo/UserMongoSchemaContainer';
import { UserMongoFindOneRepository } from '../repositories/mongo/UserMongoFindOneRepository';
import { UsersMeRouter } from '../routers/UsersMeRouter';
import { UsersRouter } from '../routers/UsersRouter';
import { UserMongoSeeder } from '../seeder/mongo/UserMongoSeeder';
import { UserMongoDocumentToUserTransformer } from '../transformers/mongo/UserMongoDocumentToUserTransformer';
import { userInjectionTypes } from './userInjectionTypes';

export class UserContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(userInjectionTypes.FindOneUserInteractor).to(FindOneUserInteractor);
      bind(userInjectionTypes.UserMiddleware).to(UserMiddleware);
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
      bind(userInjectionTypes.UsersMeRouter).to(UsersMeRouter);
      bind(userInjectionTypes.UsersRouter).to(UsersRouter);
    };

    super(registry);
  }
}
