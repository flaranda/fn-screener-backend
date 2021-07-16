import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { EntityMongo } from './EntityMongo';
import { EntityMongoModelName } from './EntityMongoModelName';

@inversify.injectable()
export abstract class EntityMongoSchemaContainer<
  TEntityMongo extends EntityMongo,
> {
  public readonly schema: mongoose.Schema;

  private readonly baseSchemaDefinition: mongoose.SchemaDefinition<EntityMongo> =
    {
      created_at: {
        required: true,
        type: Date,
      },
      updated_at: {
        required: true,
        type: Date,
      },
      uuid: {
        required: true,
        type: String,
      },
    } as mongoose.SchemaDefinition<EntityMongo>;

  constructor(
    @inversify.unmanaged()
    public readonly modelName: EntityMongoModelName,
    @inversify.unmanaged()
    schemaDefinition: mongoose.SchemaDefinition<TEntityMongo>,
    @inversify.unmanaged()
    schemaOptions: mongoose.SchemaOptions,
  ) {
    this.schema = new mongoose.Schema(
      {
        ...this.baseSchemaDefinition,
        ...schemaDefinition,
      },
      schemaOptions,
    );
  }
}
