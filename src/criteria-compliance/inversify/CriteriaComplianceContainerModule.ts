import * as inversify from 'inversify';

import { CriteriaComplianceMongoSchemaContainer } from '../models/mongo/CriteriaComplianceMongoSchemaContainer';
import { CriteriaComplianceMongoSeeder } from '../seeder/mongo/CriteriaComplianceMongoSeeder';
import { criteriaComplianceInjectionTypes } from './criteriaComplianceInjectionTypes';

export class CriteriaComplianceContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceMongoSchemaContainer,
      ).to(CriteriaComplianceMongoSchemaContainer);
      bind(criteriaComplianceInjectionTypes.CriteriaComplianceMongoSeeder).to(
        CriteriaComplianceMongoSeeder,
      );
    };

    super(registry);
  }
}
