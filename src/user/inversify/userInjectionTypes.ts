export const userInjectionTypes = {
  FindOneUserInteractor: Symbol('FindOneUserInteractor'),
  UserMiddleware: Symbol('UserMiddleware'),
  UserMongoDocumentToUserTransformer: Symbol(
    'UserMongoDocumentToUserTransformer',
  ),
  UserMongoFindOneRepository: Symbol('UserMongoFindOneRepository'),
  UserMongoSchemaContainer: Symbol('UserMongoSchemaContainer'),
  UserMongoSeeder: Symbol('UserMongoSeeder'),
  UsersMeRouter: Symbol('UsersMeRouter'),
  UsersRouter: Symbol('UsersRouter'),
};
