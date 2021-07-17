import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { UserMongo } from './UserMongo';

@inversify.injectable()
export class UserMongoSchemaContainer extends EntityMongoSchemaContainer<UserMongo> {
  constructor() {
    const modelName: EntityMongoModelName = EntityMongoModelName.User;

    const schemaDefinition: mongoose.SchemaDefinition<UserMongo> = {
      email: {
        required: true,
        type: String,
      },
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
