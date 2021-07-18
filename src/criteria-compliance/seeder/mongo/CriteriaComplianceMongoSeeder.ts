import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ISeeder } from '../../../common/interfaces/ISeeder';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { CriteriaComplianceMongo } from '../../models/mongo/CriteriaComplianceMongo';
import { CriteriaComplianceMongoDocument } from '../../models/mongo/CriteriaComplianceMongoDocument';
import { criteriaComplianceMongoSeeds } from './criteriaComplianceMongoSeeds';

@inversify.injectable()
export class CriteriaComplianceMongoSeeder implements ISeeder {
  public get model(): mongoose.Model<CriteriaComplianceMongo> {
    return this.mongoDatasource.connection.model(
      EntityMongoModelName.CriteriaCompliance,
    );
  }

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: MongoDatasource,
  ) {}

  public async seed(): Promise<void> {
    for (const criteriaComplianceMongoSeed of criteriaComplianceMongoSeeds) {
      const currentDate: Date = new Date();

      const criteriaComplianceMongoUpsertQuery: CriteriaComplianceMongo = {
        compliance: criteriaComplianceMongoSeed.compliance,
        created_at: currentDate,
        criteria_uuid: criteriaComplianceMongoSeed.criteria_uuid,
        startup_uuid: criteriaComplianceMongoSeed.startup_uuid,
        updated_at: currentDate,
        uuid: criteriaComplianceMongoSeed.uuid,
      };

      const filterQuery: mongoose.FilterQuery<CriteriaComplianceMongo> = {
        uuid: criteriaComplianceMongoSeed.uuid,
      };

      const criteriaComplianceMongoDocument: CriteriaComplianceMongoDocument | null =
        await this.model.findOne(filterQuery);

      if (hasValue(criteriaComplianceMongoDocument)) {
        criteriaComplianceMongoUpsertQuery.created_at =
          criteriaComplianceMongoDocument.created_at;

        await this.model.findOneAndUpdate(
          filterQuery,
          criteriaComplianceMongoUpsertQuery,
          {
            useFindAndModify: false,
          },
        );
      } else {
        await this.model.create(criteriaComplianceMongoUpsertQuery);
      }
    }
  }
}
