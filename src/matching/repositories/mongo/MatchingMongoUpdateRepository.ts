import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoUpdateRepository } from '../../../common/modules/mongo/EntityMongoUpdateRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { matchingInjectionTypes } from '../../inversify/matchingInjectionTypes';
import { Matching } from '../../models/domain/Matching';
import { MatchingUpdateQuery } from '../../models/domain/MatchingUpdateQuery';
import { MatchingMongo } from '../../models/mongo/MatchingMongo';
import { MatchingMongoDocument } from '../../models/mongo/MatchingMongoDocument';
import { matchingStatusToMatchingMongoStatusMap } from '../../models/mongo/matchingStatusToMatchingMongoStatusMap';

@inversify.injectable()
export class MatchingMongoUpdateRepository extends EntityMongoUpdateRepository<
  MatchingUpdateQuery,
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

  protected buildMongooseUpdateQueryFromBaseMongooseUpdateQueryAndEntityUpdateQuery(
    baseMongooseUpdateQuery: mongoose.UpdateQuery<MatchingMongo>,
    matchingUpdateQuery: MatchingUpdateQuery,
  ): mongoose.UpdateQuery<MatchingMongo> {
    const matchingMongo: Partial<MatchingMongo> = {};

    if (hasValue(matchingUpdateQuery.status)) {
      matchingMongo.status =
        matchingStatusToMatchingMongoStatusMap[matchingUpdateQuery.status];
    }

    if (hasValue(matchingUpdateQuery.statusReason)) {
      matchingMongo.status_reason = matchingUpdateQuery.statusReason;
    }

    const mongooseUpdateQuery: mongoose.UpdateQuery<MatchingMongo> = {
      ...baseMongooseUpdateQuery,
      ...matchingMongo,
    };

    return mongooseUpdateQuery;
  }
}
