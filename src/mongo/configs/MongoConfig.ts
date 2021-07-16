import * as inversify from 'inversify';

import { envVariablesLoaderInjectionTypes } from '../../env-variables-loader/inversify/envVariablesLoaderInjectionTypes';
import { EnvVariablesLoader } from '../../env-variables-loader/modules/EnvVariablesLoader';

@inversify.injectable()
export class MongoConfig {
  public readonly database: string;
  public readonly password: string;
  public readonly uri: string;
  public readonly username: string;

  constructor(
    @inversify.inject(envVariablesLoaderInjectionTypes.EnvVariablesLoader)
    envVariablesLoader: EnvVariablesLoader,
  ) {
    this.database = envVariablesLoader.envVariables.MONGO_DB_DATABASE;
    this.password = envVariablesLoader.envVariables.MONGO_DB_PASSWORD;
    this.uri = envVariablesLoader.envVariables.MONGO_DB_URI;
    this.username = envVariablesLoader.envVariables.MONGO_DB_USERNAME;
  }
}
