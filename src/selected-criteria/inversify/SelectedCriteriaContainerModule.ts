import * as inversify from 'inversify';

import { FindManySelectedCriteriasInteractor } from '../interactors/FindManySelectedCriteriasInteractor';
import { FindOneSelectedCriteriaInteractor } from '../interactors/FindOneSelectedCriteriaInteractor';
import { UpdateSelectedCriteriaInteractor } from '../interactors/UpdateSelectedCriteriaInteractor';
import { SelectedCriteriaMongoSchemaContainer } from '../models/mongo/SelectedCriteriaMongoSchemaContainer';
import { PatchV1SelectedCriteriasRequestParser } from '../parsers/api/v1/PatchV1SelectedCriteriasRequestParser';
import { SelectedCriteriaMongoFindManyRepository } from '../repositories/mongo/SelectedCriteriaMongoFindManyRepository';
import { SelectedCriteriaMongoFindOneRepository } from '../repositories/mongo/SelectedCriteriaMongoFindOneRepository';
import { SelectedCriteriaMongoUpdateRepository } from '../repositories/mongo/SelectedCriteriaMongoUpdateRepository';
import { GetUsersMeSelectedCriteriasExpressRequestHandler } from '../request-handlers/GetUsersMeSelectedCriteriasExpressRequestHandler';
import { PatchUsersMeSelectedCriteriasRequestHandler } from '../request-handlers/PatchUsersMeSelectedCriteriasRequestHandler';
import { SelectedCriteriaRequestParamHandler } from '../request-handlers/SelectedCriteriaRequestParamHandler';
import { MeSelectedCriteriasRouter } from '../routers/MeSelectedCriteriasRouter';
import { SelectedCriteriaMongoSeeder } from '../seeder/mongo/SelectedCriteriaMongoSeeder';
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
      bind(selectedCriteriaInjectionTypes.FindOneSelectedCriteriaInteractor).to(
        FindOneSelectedCriteriaInteractor,
      );
      bind(
        selectedCriteriaInjectionTypes.GetUsersMeSelectedCriteriasExpressRequestHandler,
      ).to(GetUsersMeSelectedCriteriasExpressRequestHandler);
      bind(selectedCriteriaInjectionTypes.MeSelectedCriteriasRouter).to(
        MeSelectedCriteriasRouter,
      );
      bind(
        selectedCriteriaInjectionTypes.PatchUsersMeSelectedCriteriasRequestHandler,
      ).to(PatchUsersMeSelectedCriteriasRequestHandler);
      bind(
        selectedCriteriaInjectionTypes.PatchV1SelectedCriteriasRequestParser,
      ).to(PatchV1SelectedCriteriasRequestParser);
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
      bind(selectedCriteriaInjectionTypes.UpdateSelectedCriteriaInteractor).to(
        UpdateSelectedCriteriaInteractor,
      );
    };

    super(registry);
  }
}
