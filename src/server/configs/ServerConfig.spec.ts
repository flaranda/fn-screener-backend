import 'reflect-metadata';

import { EnvVariablesFixtures } from '../../env-variables-loader/fixtures/EnvVariablesFixtures';
import { EnvVariablesLoader } from '../../env-variables-loader/modules/EnvVariablesLoader';
import { ServerConfig } from './ServerConfig';

describe('ServerConfig', () => {
  let envVariablesLoader: jest.Mocked<EnvVariablesLoader>;

  let serverConfig: ServerConfig;

  beforeAll(() => {
    envVariablesLoader = {
      envVariables: EnvVariablesFixtures.withMandatory,
    } as Partial<EnvVariablesLoader> as jest.Mocked<EnvVariablesLoader>;
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      serverConfig = new ServerConfig(envVariablesLoader);
    });

    it('should have all its properties set', () => {
      expect(serverConfig.port).toStrictEqual(
        envVariablesLoader.envVariables.SERVER_PORT,
      );
    });
  });
});
