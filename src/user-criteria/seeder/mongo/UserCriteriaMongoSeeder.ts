import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { UserCriteriaMongo } from '../../models/mongo/UserCriteriaMongo';
import { UserCriteriaMongoDocument } from '../../models/mongo/UserCriteriaMongoDocument';
import { userCriteriaMongoSeeds } from './userCriteriaMongoSeeds';

@inversify.injectable()
export class UserCriteriaMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<UserCriteriaMongo> {
    return this.mongoDatasource.connection.model(
      EntityMongoModelName.UserCriteria,
    );
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const userCriteriaMongoSeed of userCriteriaMongoSeeds) {
      const currentDate: Date = new Date();

      const userCriteriaMongoUpsertQuery: UserCriteriaMongo = {
        created_at: currentDate,
        criteria_uuid: userCriteriaMongoSeed.criteria_uuid,
        importance: userCriteriaMongoSeed.importance,
        updated_at: currentDate,
        user_uuid: userCriteriaMongoSeed.user_uuid,
        uuid: userCriteriaMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<UserCriteriaMongo> = {
        uuid: userCriteriaMongoSeed.uuid,
      };

      const userCriteriaMongoDocument: UserCriteriaMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(userCriteriaMongoDocument)) {
        userCriteriaMongoUpsertQuery.created_at =
          userCriteriaMongoDocument.created_at;

        await this.model.findOneAndUpdate(
          filterQuery,
          userCriteriaMongoUpsertQuery,
          {
            useFindAndModify: false,
          },
        );
      } else {
        await this.model.create(userCriteriaMongoUpsertQuery);
      }
    }
  }
}
