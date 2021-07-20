export const startupInjectionTypes = {
  FindOneStartupInteractor: Symbol('FindOneStartupInteractor'),
  StartupMongoDocumentToStartupTransformer: Symbol(
    'StartupMongoDocumentToStartupTransformer',
  ),
  StartupMongoFindOneRepository: Symbol('StartupMongoFindOneRepository'),
  StartupMongoSchemaContainer: Symbol('StartupMongoSchemaContainer'),
  StartupMongoSeeder: Symbol('StartupMongoSeeder'),
  StartupUuidRequestParamHandler: Symbol('StartupUuidRequestParamHandler'),
};
