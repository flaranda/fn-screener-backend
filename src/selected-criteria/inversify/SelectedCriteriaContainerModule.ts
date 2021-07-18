import * as inversify from 'inversify';

import { FindManySelectedCriteriasInteractor } from '../interactors/FindManySelectedCriteriasInteractor';
import { FindOneSelectedCriteriasInteractor } from '../interactors/FindOneSelectedCriteriasInteractor';
import { UpdateSelectedCriteriasInteractor } from '../interactors/UpdateSelectedCriteriaInteractor';
import { SelectedCriteriaMongoSchemaContainer } from '../models/mongo/SelectedCriteriaMongoSchemaContainer';
import { PutV1SelectedCriteriasRequestParser } from '../parsers/api/v1/PutV1SelectedCriteriasRequestParser';
import { SelectedCriteriaMongoFindManyRepository } from '../repositories/mongo/SelectedCriteriaMongoFindManyRepository';
import { SelectedCriteriaMongoFindOneRepository } from '../repositories/mongo/SelectedCriteriaMongoFindOneRepository';
import { SelectedCriteriaMongoUpdateRepository } from '../repositories/mongo/SelectedCriteriaMongoUpdateRepository';
import { GetUsersMeSelectedCriteriasExpressRequestHandler } from '../request-handlers/GetUsersMeSelectedCriteriasExpressRequestHandler';
import { SelectedCriteriaRequestParamHandler } from '../request-handlers/SelectedCriteriaRequestParamHandler';
import { MeSelectedCriteriasRouter } from '../routers/MeSelectedCriteriasRouter';
import { SelectedCriteriaMongoSeeder } from '../seeder/mongo/SelectedCriteriaMongoSeeder';
import { SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer } from '../transformers/api/v1/SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer';
import { SelectedCriteriaToSelectedCriteriaApiV1Transformer } from '../transformers/api/v1/SelectedCriteriaToSelectedCriteriaApiV1Transformer';
import { SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer } from '../transformers/mongo/SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer';
import { SelectedCriteriaApiV1UpdateQueryTypeGuard } from '../type-guards/api/v1/SelectedCriteriaApiV1UpdateQueryTypeGuard';
import { selectedCriteriaInjectionTypes } from './selectedCriteriaInjectionTypes';

export class SelectedCriteriaContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(
        selectedCriteriaInjectionTypes.FindManySelectedCriteriasInteractor,
      ).to(FindManySelectedCriteriasInteractor);
      bind(
        selectedCriteriaInjectionTypes.FindOneSelectedCriteriasInteractor,
      ).to(FindOneSelectedCriteriasInteractor);
      bind(
        selectedCriteriaInjectionTypes.GetUsersMeSelectedCriteriasExpressRequestHandler,
      ).to(GetUsersMeSelectedCriteriasExpressRequestHandler);
      bind(selectedCriteriaInjectionTypes.MeSelectedCriteriasRouter).to(
        MeSelectedCriteriasRouter,
      );
      bind(
        selectedCriteriaInjectionTypes.PutV1SelectedCriteriasRequestParser,
      ).to(PutV1SelectedCriteriasRequestParser);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer,
      ).to(
        SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer,
      );
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaApiV1UpdateQueryTypeGuard,
      ).to(SelectedCriteriaApiV1UpdateQueryTypeGuard);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer,
      ).to(SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaMongoFindManyRepository,
      ).to(SelectedCriteriaMongoFindManyRepository);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaMongoFindOneRepository,
      ).to(SelectedCriteriaMongoFindOneRepository);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaMongoSchemaContainer,
      ).to(SelectedCriteriaMongoSchemaContainer);
      bind(selectedCriteriaInjectionTypes.SelectedCriteriaMongoSeeder).to(
        SelectedCriteriaMongoSeeder,
      );
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaMongoUpdateRepository,
      ).to(SelectedCriteriaMongoUpdateRepository);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaRequestParamHandler,
      ).to(SelectedCriteriaRequestParamHandler);
      bind(
        selectedCriteriaInjectionTypes.SelectedCriteriaToSelectedCriteriaApiV1Transformer,
      ).to(SelectedCriteriaToSelectedCriteriaApiV1Transformer);
      bind(selectedCriteriaInjectionTypes.UpdateSelectedCriteriasInteractor).to(
        UpdateSelectedCriteriasInteractor,
      );
    };

    super(registry);
  }
}
