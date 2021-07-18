import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoSchemaContainer } from '../../../common/models/mongo/EntityMongoSchemaContainer';
import { StartupMongo } from './StartupMongo';

@inversify.injectable()
export class StartupMongoSchemaContainer extends EntityMongoSchemaContainer<StartupMongo> {
  constructor() {
    const modelName: EntityMongoModelName = EntityMongoModelName.Startup;

    const schemaDefinition: mongoose.SchemaDefinition<StartupMongo> = {
      name: {
        required: true,
        type: String,
      },
      url: {
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
