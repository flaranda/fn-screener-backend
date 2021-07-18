import * as inversify from 'inversify';

import { MatchingMongoSchemaContainer } from '../models/mongo/MatchingMongoSchemaContainer';
import { MatchingMongoSeeder } from '../seeders/mongo/MatchingMongoSeeder';
import { matchingInjectionTypes } from './matchingInjectionTypes';

export class MatchingContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(matchingInjectionTypes.MatchingMongoSchemaContainer).to(
        MatchingMongoSchemaContainer,
      );
      bind(matchingInjectionTypes.MatchingMongoSeeder).to(MatchingMongoSeeder);
    };

    super(registry);
  }
}
