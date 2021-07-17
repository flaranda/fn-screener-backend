import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { UserCriteriaMongo } from './UserCriteriaMongo';

@inversify.injectable()
export class UserCriteriaMongoSchemaContainer extends EntityMongoSchemaContainer<UserCriteriaMongo> {
  constructor() {
    const modelName: EntityMongoModelName = EntityMongoModelName.UserCriteria;

    const schemaDefinition: mongoose.SchemaDefinition<UserCriteriaMongo> = {
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
