import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { SelectedCriteriaMongo } from '../../models/mongo/SelectedCriteriaMongo';
import { SelectedCriteriaMongoDocument } from '../../models/mongo/SelectedCriteriaMongoDocument';
import { selectedCriteriaMongoSeeds } from './selectedCriteriaMongoSeeds';

@inversify.injectable()
export class SelectedCriteriaMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<SelectedCriteriaMongo> {
    return this.mongoDatasource.connection.model(
      EntityMongoModelName.SelectedCriteria,
    );
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const selectedCriteriaMongoSeed of selectedCriteriaMongoSeeds) {
      const currentDate: Date = new Date();

      const selectedCriteriaMongoUpsertQuery: SelectedCriteriaMongo = {
        created_at: currentDate,
        criteria_uuid: selectedCriteriaMongoSeed.criteria_uuid,
        importance: selectedCriteriaMongoSeed.importance,
        updated_at: currentDate,
        user_uuid: selectedCriteriaMongoSeed.user_uuid,
        uuid: selectedCriteriaMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<SelectedCriteriaMongo> = {
        uuid: selectedCriteriaMongoSeed.uuid,
      };

      const selectedCriteriaMongoDocument: SelectedCriteriaMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(selectedCriteriaMongoDocument)) {
        selectedCriteriaMongoUpsertQuery.created_at =
          selectedCriteriaMongoDocument.created_at;

        await this.model.findOneAndUpdate(
          filterQuery,
          selectedCriteriaMongoUpsertQuery,
          {
            useFindAndModify: false,
          },
        );
      } else {
        await this.model.create(selectedCriteriaMongoUpsertQuery);
      }
    }
  }
}
