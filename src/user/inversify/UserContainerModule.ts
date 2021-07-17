import * as inversify from 'inversify';

import { UserMongoSchemaContainer } from '../models/mongo/UserMongoSchemaContainer';
import { userInjectionTypes } from './userInjectionTypes';

export class UserContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(userInjectionTypes.UserMongoSchemaContainer).to(
        UserMongoSchemaContainer,
      );
    };

    super(registry);
  }
}
