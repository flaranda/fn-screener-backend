import * as inversify from 'inversify';

import { FindManyCriteriaCompliancesInteractor } from '../../criteria-compliance/interactors/FindManyCriteriaCompliancesInteractor';
import { FindOneMatchingInteractor } from '../interactors/FindOneMatchingInteractor';
import { UpdateMatchingInteractor } from '../interactors/UpdateMatchingInteractor';
import { MatchingMongoSchemaContainer } from '../models/mongo/MatchingMongoSchemaContainer';
import { MatchingMongoFindManyRepository } from '../repositories/mongo/MatchingMongoFindManyRepository';
import { MatchingMongoFindOneRepository } from '../repositories/mongo/MatchingMongoFindOneRepository';
import { MatchingMongoUpdateRepository } from '../repositories/mongo/MatchingMongoUpdateRepository';
import { MatchingMongoSeeder } from '../seeders/mongo/MatchingMongoSeeder';
import { MatchingMongoDocumentToMatchingTransformer } from '../transformers/mongo/MatchingMongoDocumentToMatchingTransformer';
import { MatchingApiV1UpdateQueryTypeGuard } from '../type-guards/api/v1/MatchingApiV1UpdateQueryTypeGuard';
import { matchingInjectionTypes } from './matchingInjectionTypes';

export class MatchingContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(matchingInjectionTypes.FindManyMatchingsInteractor).to(
        FindManyCriteriaCompliancesInteractor,
      );
      bind(matchingInjectionTypes.FindOneMatchingInteractor).to(
        FindOneMatchingInteractor,
      );
      bind(matchingInjectionTypes.MatchingApiV1UpdateQueryTypeGuard).to(
        MatchingApiV1UpdateQueryTypeGuard,
      );
      bind(
        matchingInjectionTypes.MatchingMongoDocumentToMatchingTransformer,
      ).to(MatchingMongoDocumentToMatchingTransformer);
      bind(matchingInjectionTypes.MatchingMongoFindManyRepository).to(
        MatchingMongoFindManyRepository,
      );
      bind(matchingInjectionTypes.MatchingMongoFindOneRepository).to(
        MatchingMongoFindOneRepository,
      );
      bind(matchingInjectionTypes.MatchingMongoSchemaContainer).to(
        MatchingMongoSchemaContainer,
      );
      bind(matchingInjectionTypes.MatchingMongoSeeder).to(MatchingMongoSeeder);
      bind(matchingInjectionTypes.MatchingMongoUpdateRepository).to(
        MatchingMongoUpdateRepository,
      );
      bind(matchingInjectionTypes.UpdateMatchingInteractor).to(
        UpdateMatchingInteractor,
      );
    };

    super(registry);
  }
}
