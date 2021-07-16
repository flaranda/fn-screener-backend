import 'reflect-metadata';

import { EnvVariablesFixtures } from '../../env-variables-loader/fixtures/EnvVariablesFixtures';
import { EnvVariablesLoader } from '../../env-variables-loader/modules/EnvVariablesLoader';
import { MongoConfig } from './MongoConfig';

describe('MongoConfig', () => {
  let envVariablesLoader: jest.Mocked<EnvVariablesLoader>;

  let mongoConfig: MongoConfig;

  beforeAll(() => {
    envVariablesLoader = {
      envVariables: EnvVariablesFixtures.withMandatory,
    } as Partial<EnvVariablesLoader> as jest.Mocked<EnvVariablesLoader>;
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      mongoConfig = new MongoConfig(envVariablesLoader);
    });

    it('should have all its properties set', () => {
      expect(mongoConfig.database).toStrictEqual(
        envVariablesLoader.envVariables.MONGO_DB_DATABASE,
      );
      expect(mongoConfig.password).toStrictEqual(
        envVariablesLoader.envVariables.MONGO_DB_PASSWORD,
      );
      expect(mongoConfig.uri).toStrictEqual(
        envVariablesLoader.envVariables.MONGO_DB_URI,
      );
      expect(mongoConfig.username).toStrictEqual(
        envVariablesLoader.envVariables.MONGO_DB_USERNAME,
      );
    });
  });
});
