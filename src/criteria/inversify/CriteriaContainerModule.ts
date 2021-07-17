import * as inversify from 'inversify';

import { FindManyCriteriasInteractor } from '../interactors/FindManyCriteriasInteractor';
import { FindOneCriteriaInteractor } from '../interactors/FindOneCriteriaInteractor';
import { CriteriaMongoSchemaContainer } from '../models/mongo/CriteriaMongoSchemaContainer';
import { CriteriaMongoFindManyRepository } from '../repositories/mongo/CriteriaMongoFindManyRepository';
import { CriteriaMongoFindOneRepository } from '../repositories/mongo/CriteriaMongoFindOneRepository';
import { GetCriteriasExpressRequestHandler } from '../request-handlers/GetCriteriasExpressRequestHandler';
import { CriteriasExpressRouter } from '../routers/CriteriasExpressRouter';
import { CriteriaMongoSeeder } from '../seeder/mongo/CriteriaMongoSeeder';
import { CriteriaToCriteriaApiV1Transformer } from '../transformers/api/v1/CriteriaToCriteriaApiV1Transformer';
import { CriteriaMongoDocumentToCriteriaTransformer } from '../transformers/mongo/CriteriaMongoDocumentToCriteriaTransformer';
import { criteriaInjectionTypes } from './criteriaInjectionTypes';

export class CriteriaContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(criteriaInjectionTypes.CriteriaMongoFindManyRepository).to(
        CriteriaMongoFindManyRepository,
      );
      bind(criteriaInjectionTypes.CriteriaMongoFindOneRepository).to(
        CriteriaMongoFindOneRepository,
      );
      bind(
        criteriaInjectionTypes.CriteriaMongoDocumentToCriteriaTransformer,
      ).to(CriteriaMongoDocumentToCriteriaTransformer);
      bind(criteriaInjectionTypes.CriteriaMongoSchemaContainer).to(
        CriteriaMongoSchemaContainer,
      );
      bind(criteriaInjectionTypes.CriteriaMongoSeeder).to(CriteriaMongoSeeder);
      bind(criteriaInjectionTypes.CriteriasExpressRouter).to(
        CriteriasExpressRouter,
      );
      bind(criteriaInjectionTypes.CriteriaToCriteriaApiV1Transformer).to(
        CriteriaToCriteriaApiV1Transformer,
      );
      bind(criteriaInjectionTypes.FindManyCriteriasInteractor).to(
        FindManyCriteriasInteractor,
      );
      bind(criteriaInjectionTypes.FindOneCriteriaInteractor).to(
        FindOneCriteriaInteractor,
      );
      bind(criteriaInjectionTypes.GetCriteriasExpressRequestHandler).to(
        GetCriteriasExpressRequestHandler,
      );
    };

    super(registry);
  }
}
