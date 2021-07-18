import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { StartupMongo } from '../../models/mongo/StartupMongo';
import { StartupMongoDocument } from '../../models/mongo/StartupMongoDocument';
import { startupMongoSeeds } from './startupMongoSeeds';

@inversify.injectable()
export class StartupMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<StartupMongo> {
    return this.mongoDatasource.connection.model(EntityMongoModelName.Startup);
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const startupMongoSeed of startupMongoSeeds) {
      const currentDate: Date = new Date();

      const startupMongo: StartupMongo = {
        created_at: currentDate,
        name: startupMongoSeed.name,
        updated_at: currentDate,
        url: startupMongoSeed.url,
        uuid: startupMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<StartupMongo> = {
        uuid: startupMongoSeed.uuid,
      };

      const selectedCriteriaMongoDocument: StartupMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(selectedCriteriaMongoDocument)) {
        startupMongo.created_at = selectedCriteriaMongoDocument.created_at;

        await this.model.findOneAndUpdate(filterQuery, startupMongo, {
          useFindAndModify: false,
        });
      } else {
        await this.model.create(startupMongo);
      }
    }
  }
}
