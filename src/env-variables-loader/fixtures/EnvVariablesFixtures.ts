import { EnvVariables } from '../models/EnvVariables';

export class EnvVariablesFixtures {
  public static get withMandatory(): EnvVariables {
    const fixture: EnvVariables = {
      MONGO_DB_DATABASE: '',
      MONGO_DB_PASSWORD: '',
      MONGO_DB_URI: '',
      MONGO_DB_USERNAME: '',
      SERVER_PORT: 3000,
    };

    return fixture;
  }
}
