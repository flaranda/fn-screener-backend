import path from 'path';

import dotenv from 'dotenv';
import * as envalid from 'envalid';
import * as inversify from 'inversify';

import { hasValue } from '../../common/helpers/hasValue';
import { EnvVariables } from '../models/EnvVariables';

@inversify.injectable()
export class EnvVariablesLoader {
  public get envVariables(): EnvVariables {
    if (hasValue(this.variables)) {
      return this.variables;
    } else {
      throw new Error('Expected EnvVariables to be loaded');
    }
  }

  private readonly envalidValidators: {
    [TKey in keyof EnvVariables]: envalid.ValidatorSpec<EnvVariables[TKey]>;
  } = {
    MONGO_DB_DATABASE: envalid.str(),
    MONGO_DB_PASSWORD: envalid.str(),
    MONGO_DB_URI: envalid.str(),
    MONGO_DB_USERNAME: envalid.str(),
    SERVER_PORT: envalid.port(),
  };

  private readonly envFilepath: string;
  private readonly dotenvName: string = '.env';
  private variables: EnvVariables | undefined;

  constructor() {
    this.envFilepath = path.join(process.cwd(), this.dotenvName);

    this.load();
  }

  public load(): void {
    this.populateProcessEnv();

    const cleanedEnv: EnvVariables = this.cleanEnv();

    this.setVariables(cleanedEnv);
  }

  private cleanEnv(): EnvVariables {
    const envalidOptions: envalid.CleanOptions<EnvVariables> = {};

    const cleanEnv: EnvVariables = envalid.cleanEnv(
      process.env,
      this.envalidValidators,
      envalidOptions,
    );

    return cleanEnv;
  }

  private populateProcessEnv(): void {
    const dotenvOptions: dotenv.DotenvConfigOptions = {
      path: this.envFilepath,
    };

    dotenv.config(dotenvOptions);
  }

  private setVariables(env: EnvVariables): void {
    this.variables = {
      MONGO_DB_DATABASE: env.MONGO_DB_DATABASE,
      MONGO_DB_PASSWORD: env.MONGO_DB_PASSWORD,
      MONGO_DB_URI: env.MONGO_DB_URI,
      MONGO_DB_USERNAME: env.MONGO_DB_USERNAME,
      SERVER_PORT: env.SERVER_PORT,
    };
  }
}
