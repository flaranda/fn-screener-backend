import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { SelectedCriteriaMongo } from './SelectedCriteriaMongo';

@inversify.injectable()
export class SelectedCriteriaMongoSchemaContainer extends EntityMongoSchemaContainer<SelectedCriteriaMongo> {
  constructor() {
    const modelName: EntityMongoModelName =
      EntityMongoModelName.SelectedCriteria;

    const schemaDefinition: mongoose.SchemaDefinition<SelectedCriteriaMongo> = {
      criteria_uuid: {
        required: true,
        type: String,
      },
      importance: {
        required: true,
        type: String,
      },
      user_uuid: {
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
