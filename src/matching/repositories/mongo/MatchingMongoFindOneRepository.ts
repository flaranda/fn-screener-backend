import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindOneRepository } from '../../../common/modules/mongo/EntityMongoFindOneRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { matchingInjectionTypes } from '../../inversify/matchingInjectionTypes';
import { Matching } from '../../models/domain/Matching';
import { MatchingFindQuery } from '../../models/domain/MatchingFindQuery';
import { MatchingMongo } from '../../models/mongo/MatchingMongo';
import { MatchingMongoDocument } from '../../models/mongo/MatchingMongoDocument';

@inversify.injectable()
export class MatchingMongoFindOneRepository extends EntityMongoFindOneRepository<
  MatchingFindQuery,
  Matching,
  MatchingMongo,
  MatchingMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(
      matchingInjectionTypes.MatchingMongoDocumentToMatchingTransformer,
    )
    matchingMongoDocumentToMatchingTransformer: ITransformer<
      MatchingMongoDocument,
      Matching
    >,
  ) {
    super(
      mongoDatasource,
      matchingMongoDocumentToMatchingTransformer,
      EntityMongoModelName.Matching,
    );
  }

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    mongooseFilterQuery: mongoose.FilterQuery<MatchingMongo>,
    _matchingFindQuery: MatchingFindQuery,
  ): mongoose.FilterQuery<MatchingMongo> {
    return mongooseFilterQuery;
  }
}
