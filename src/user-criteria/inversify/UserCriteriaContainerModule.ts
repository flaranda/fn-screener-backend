import * as inversify from 'inversify';

import { UserCriteriaMongoSchemaContainer } from '../models/mongo/UserCriteriaMongoSchemaContainer';
import { userCriteriaInjectionTypes } from './userCriteriaInjectionTypes';

export class UserCriteriaContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(userCriteriaInjectionTypes.UserCriteriaMongoSchemaContainer).to(
        UserCriteriaMongoSchemaContainer,
      );
    };

    super(registry);
  }
}
