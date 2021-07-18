import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { CriteriaComplianceMongo } from './CriteriaComplianceMongo';

@inversify.injectable()
export class CriteriaComplianceMongoSchemaContainer extends EntityMongoSchemaContainer<CriteriaComplianceMongo> {
  constructor() {
    const modelName: EntityMongoModelName = EntityMongoModelName.Criteria;

    const schemaDefinition: mongoose.SchemaDefinition<CriteriaComplianceMongo> =
      {
        compliance: {
          required: true,
          type: Boolean,
        },
        criteria_uuid: {
          required: true,
          type: String,
        },
        startup_uuid: {
          required: true,
          type: String,
        },
      };

    const schemaOptions: mongoose.SchemaOptions = {
      collection: modelName,
    };

    super(modelName, schemaDefinition, schemaOptions);
  }
}
