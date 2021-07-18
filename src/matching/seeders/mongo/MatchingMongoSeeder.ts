import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { MatchingMongo } from '../../models/mongo/MatchingMongo';
import { MatchingMongoDocument } from '../../models/mongo/MatchingMongoDocument';
import { matchingMongoSeeds } from './matchingMongoSeeds';

@inversify.injectable()
export class MatchingMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<MatchingMongo> {
    return this.mongoDatasource.connection.model(EntityMongoModelName.Matching);
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const matchingMongoSeed of matchingMongoSeeds) {
      const currentDate: Date = new Date();

      const matchingMongoUpsertQuery: MatchingMongo = {
        created_at: currentDate,
        startup_uuid: matchingMongoSeed.startup_uuid,
        status: matchingMongoSeed.status,
        updated_at: currentDate,
        user_uuid: matchingMongoSeed.user_uuid,
        uuid: matchingMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<MatchingMongo> = {
        uuid: matchingMongoSeed.uuid,
      };

      const matchingMongoDocument: MatchingMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(matchingMongoDocument)) {
        matchingMongoUpsertQuery.created_at = matchingMongoDocument.created_at;

        await this.model.findOneAndUpdate(
          filterQuery,
          matchingMongoUpsertQuery,
          {
            useFindAndModify: false,
          },
        );
      } else {
        await this.model.create(matchingMongoUpsertQuery);
      }
    }
  }
}
