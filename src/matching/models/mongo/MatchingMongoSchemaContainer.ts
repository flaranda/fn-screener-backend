import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { MatchingMongo } from './MatchingMongo';

@inversify.injectable()
export class MatchingMongoSchemaContainer extends EntityMongoSchemaContainer<MatchingMongo> {
  constructor() {
    const modelName: EntityMongoModelName = EntityMongoModelName.Matching;

    const schemaDefinition: mongoose.SchemaDefinition<MatchingMongo> = {
      startup_uuid: {
        required: true,
        type: String,
      },
      status: {
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
