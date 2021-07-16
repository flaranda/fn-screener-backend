export interface EnvVariables {
  readonly MONGO_DB_DATABASE: string;
  readonly MONGO_DB_PASSWORD: string;
  readonly MONGO_DB_URI: string;
  readonly MONGO_DB_USERNAME: string;

  readonly SERVER_PORT: number;
}
