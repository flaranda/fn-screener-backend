export const startupInjectionTypes = {
  FindOneStartupInteractor: Symbol('FindOneStartupInteractor'),
  StartupMongoDocumentToStartupTransformer: Symbol(
    'StartupMongoDocumentToStartupTransformer',
  ),
  StartupMongoFindOneRepository: Symbol('StartupMongoFindOneRepository'),
  StartupMongoSchemaContainer: Symbol('StartupMongoSchemaContainer'),
  StartupMongoSeeder: Symbol('StartupMongoSeeder'),
  StartupsRouter: Symbol('StartupsRouter'),
  StartupsStartupUuidRouter: Symbol('StartupsStartupUuidRouter'),
  StartupUuidRequestParamHandler: Symbol('StartupUuidRequestParamHandler'),
};
