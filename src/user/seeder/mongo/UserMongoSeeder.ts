import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { UserMongo } from '../../models/mongo/UserMongo';
import { UserMongoDocument } from '../../models/mongo/UserMongoDocument';
import { userMongoSeeds } from './userMongoSeeds';

@inversify.injectable()
export class UserMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<UserMongo> {
    return this.mongoDatasource.connection.model(EntityMongoModelName.User);
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const userMongoSeed of userMongoSeeds) {
      const currentDate: Date = new Date();

      const userMongoUpsertQuery: UserMongo = {
        created_at: currentDate,
        email: userMongoSeed.email,
        name: userMongoSeed.name,
        updated_at: currentDate,
        uuid: userMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<UserMongo> = {
        uuid: userMongoSeed.uuid,
      };

      const userMongoDocument: UserMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(userMongoDocument)) {
        userMongoUpsertQuery.created_at = userMongoDocument.created_at;

        await this.model.findOneAndUpdate(filterQuery, userMongoUpsertQuery, {
          useFindAndModify: false,
        });
      } else {
        await this.model.create(userMongoUpsertQuery);
      }
    }
  }
}
