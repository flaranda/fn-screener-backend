import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { CriteriaMongo } from './CriteriaMongo';

@inversify.injectable()
export class CriteriaMongoSchemaContainer extends EntityMongoSchemaContainer<CriteriaMongo> {
  constructor() {
    const modelName: EntityMongoModelName = EntityMongoModelName.Criteria;

    const schemaDefinition: mongoose.SchemaDefinition<CriteriaMongo> = {
      name: {
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
