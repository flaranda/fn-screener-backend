import * as inversify from 'inversify';

import { CriteriaMongoSchemaContainer } from '../models/mongo/CriteriaMongoSchemaContainer';
import { CriteriaToCriteriaApiV1Transformer } from '../transformers/api/v1/CriteriaToCriteriaApiV1Transformer';
import { criteriaInjectionTypes } from './criteriaInjectionTypes';

export class CriteriaContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(criteriaInjectionTypes.CriteriaMongoSchemaContainer).to(
        CriteriaMongoSchemaContainer,
      );
      bind(criteriaInjectionTypes.CriteriaToCriteriaApiV1Transformer).to(
        CriteriaToCriteriaApiV1Transformer,
      );
    };

    super(registry);
  }
}
