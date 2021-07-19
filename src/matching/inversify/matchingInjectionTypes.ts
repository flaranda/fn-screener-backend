export const matchingInjectionTypes = {
  FindManyMatchingsInteractor: Symbol('FindManyMatchingsInteractor'),
  FindOneMatchingInteractor: Symbol('FindOneMatchingInteractor'),
  GetUsersMeMatchingsRequestHandler: Symbol(
    'GetUsersMeMatchingsRequestHandler',
  ),
  GetV1MatchingsRequestToMatchingFindQueryTransformer: Symbol(
    'GetV1MatchingsRequestToMatchingFindQueryTransformer',
  ),
  MatchingApiV1UpdateQueryTypeGuard: Symbol(
    'MatchingApiV1UpdateQueryTypeGuard',
  ),
  MatchingMongoDocumentToMatchingTransformer: Symbol(
    'MatchingMongoDocumentToMatchingTransformer',
  ),
  MatchingMongoFindManyRepository: Symbol('MatchingMongoFindManyRepository'),
  MatchingMongoFindOneRepository: Symbol('MatchingMongoFindOneRepository'),
  MatchingMongoSchemaContainer: Symbol('MatchingMongoSchemaContainer'),
  MatchingMongoSeeder: Symbol('MatchingMongoSeeder'),
  MatchingMongoUpdateRepository: Symbol('MatchingMongoUpdateRepository'),
  MatchingToMatchingApiV1Transformer: Symbol(
    'MatchingToMatchingApiV1Transformer',
  ),
  MatchingUuidRequestParamHandler: Symbol('MatchingUuidRequestParamHandler'),
  MeMatchingsRouter: Symbol('MeMatchingsRouter'),
  PatchV1MatchingsMatchingUuidRequestParser: Symbol(
    'PatchV1MatchingsMatchingUuidRequestParser',
  ),
  UpdateMatchingInteractor: Symbol('UpdateMatchingInteractor'),
};
