import * as inversify from 'inversify';

import { FindManyCriteriaCompliancesInteractor } from '../interactors/FindManyCriteriaCompliancesInteractor';
import { FindOneCriteriaComplianceInteractor } from '../interactors/FindOneCriteriaComplianceInteractor';
import { UpdateCriteriaComplianceInteractor } from '../interactors/UpdateCriteriaComplianceInteractor';
import { CriteriaComplianceMongoSchemaContainer } from '../models/mongo/CriteriaComplianceMongoSchemaContainer';
import { PatchV1CriteriaCompliancesRequestParser } from '../parsers/api/v1/PatchV1CriteriaCompliancesRequestParser';
import { CriteriaComplianceMongoFindManyRepository } from '../repositories/mongo/CriteriaComplianceMongoFindManyRepository';
import { CriteriaComplianceMongoFindOneRepository } from '../repositories/mongo/CriteriaComplianceMongoFindOneRepository';
import { CriteriaComplianceMongoUpdateRepository } from '../repositories/mongo/CriteriaComplianceMongoUpdateRepository';
import { CriteriaComplianceRequestParamHandler } from '../request-handlers/CriteriaComplianceRequestParamHandler';
import { PatchCriteriaCompliancesRequestHandler } from '../request-handlers/PatchCriteriaCompliancesRequestHandler';
import { CriteriaCompliancesRouter } from '../routers/CriteriaCompliancesRouter';
import { CriteriaComplianceMongoSeeder } from '../seeder/mongo/CriteriaComplianceMongoSeeder';
import { CriteriaComplianceToCriteriaComplianceApiV1Transformer } from '../transformers/api/v1/CriteriaComplianceToCriteriaComplianceApiV1Transformer';
import { PatchV1CriteriaCompliancesRequestToCriteriaComplianceUpdateQueryTransformer } from '../transformers/api/v1/PatchV1CriteriaCompliancesRequestToCriteriaComplianceUpdateQueryTransformer';
import { CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer } from '../transformers/mongo/CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer';
import { CriteriaComplianceApiV1UpdateQueryTypeGuard } from '../type-guards/api/v1/CriteriaComplianceApiV1UpdateQueryTypeGuard';
import { criteriaComplianceInjectionTypes } from './criteriaComplianceInjectionTypes';

export class CriteriaComplianceContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceApiV1UpdateQueryTypeGuard,
      ).to(CriteriaComplianceApiV1UpdateQueryTypeGuard);
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer,
      ).to(CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer);
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceMongoFindManyRepository,
      ).to(CriteriaComplianceMongoFindManyRepository);
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceMongoFindOneRepository,
      ).to(CriteriaComplianceMongoFindOneRepository);
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceMongoSchemaContainer,
      ).to(CriteriaComplianceMongoSchemaContainer);
      bind(criteriaComplianceInjectionTypes.CriteriaComplianceMongoSeeder).to(
        CriteriaComplianceMongoSeeder,
      );
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceMongoUpdateRepository,
      ).to(CriteriaComplianceMongoUpdateRepository);
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceRequestParamHandler,
      ).to(CriteriaComplianceRequestParamHandler);
      bind(criteriaComplianceInjectionTypes.CriteriaCompliancesRouter).to(
        CriteriaCompliancesRouter,
      );
      bind(
        criteriaComplianceInjectionTypes.CriteriaComplianceToCriteriaComplianceApiV1Transformer,
      ).to(CriteriaComplianceToCriteriaComplianceApiV1Transformer);
      bind(
        criteriaComplianceInjectionTypes.FindManyCriteriaCompliancesInteractor,
      ).to(FindManyCriteriaCompliancesInteractor);
      bind(
        criteriaComplianceInjectionTypes.FindOneCriteriaComplianceInteractor,
      ).to(FindOneCriteriaComplianceInteractor);
      bind(
        criteriaComplianceInjectionTypes.PatchCriteriaCompliancesRequestHandler,
      ).to(PatchCriteriaCompliancesRequestHandler);
      bind(
        criteriaComplianceInjectionTypes.PatchV1CriteriaCompliancesRequestParser,
      ).to(PatchV1CriteriaCompliancesRequestParser);
      bind(
        criteriaComplianceInjectionTypes.PatchV1CriteriaCompliancesRequestToCriteriaComplianceUpdateQueryTransformer,
      ).to(
        PatchV1CriteriaCompliancesRequestToCriteriaComplianceUpdateQueryTransformer,
      );
      bind(
        criteriaComplianceInjectionTypes.UpdateCriteriaComplianceInteractor,
      ).to(UpdateCriteriaComplianceInteractor);
    };

    super(registry);
  }
}
