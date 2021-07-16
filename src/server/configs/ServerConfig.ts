import * as inversify from 'inversify';

import { envVariablesLoaderInjectionTypes } from '../../env-variables-loader/inversify/envVariablesLoaderInjectionTypes';
import { EnvVariablesLoader } from '../../env-variables-loader/modules/EnvVariablesLoader';

@inversify.injectable()
export class ServerConfig {
  public readonly port: number;

  constructor(
    @inversify.inject(envVariablesLoaderInjectionTypes.EnvVariablesLoader)
    envVariablesLoader: EnvVariablesLoader,
  ) {
    this.port = envVariablesLoader.envVariables.SERVER_PORT;
  }
}
