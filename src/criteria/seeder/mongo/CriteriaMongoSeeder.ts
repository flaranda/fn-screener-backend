import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { CriteriaMongo } from '../../models/mongo/CriteriaMongo';
import { CriteriaMongoDocument } from '../../models/mongo/CriteriaMongoDocument';
import { criteriaMongoSeeds } from './criteriaMongoSeeds';

@inversify.injectable()
export class CriteriaMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<CriteriaMongo> {
    return this.mongoDatasource.connection.model(EntityMongoModelName.Criteria);
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const criteriaMongoSeed of criteriaMongoSeeds) {
      const currentDate: Date = new Date();

      const criteriaMongoUpsertQuery: CriteriaMongo = {
        created_at: currentDate,
        name: criteriaMongoSeed.name,
        updated_at: currentDate,
        uuid: criteriaMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<CriteriaMongo> = {
        uuid: criteriaMongoSeed.uuid,
      };

      const criteriaMongoDocument: CriteriaMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(criteriaMongoDocument)) {
        criteriaMongoUpsertQuery.created_at = criteriaMongoDocument.created_at;

        await this.model.findOneAndUpdate(
          filterQuery,
          criteriaMongoUpsertQuery,
          { useFindAndModify: false },
        );
      } else {
        await this.model.create(criteriaMongoUpsertQuery);
      }
    }
  }
}
