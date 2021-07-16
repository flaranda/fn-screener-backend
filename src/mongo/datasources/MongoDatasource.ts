import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../common/helpers/hasValue';
import { IDatasource } from '../../common/interfaces/IDatasource';
import { EntityMongo } from '../../common/models/mongo/EntityMongo';
import { EntityMongoSchemaContainer } from '../../common/models/mongo/EntityMongoSchemaContainer';
import { criteriaInjectionTypes } from '../../criteria/inversify/criteriaInjectionTypes';
import { CriteriaMongo } from '../../criteria/models/mongo/CriteriaMongo';
import { MongoConfig } from '../configs/MongoConfig';
import { mongoInjectionTypes } from '../inversify/mongoInjectionTypes';

@inversify.injectable()
export class MongoDatasource implements IDatasource {
  private mongooseConnection: mongoose.Connection | undefined;

  constructor(
    @inversify.inject(mongoInjectionTypes.MongoConfig)
    private readonly mongoConfig: MongoConfig,
    @inversify.inject(criteriaInjectionTypes.CriteriaMongoSchemaContainer)
    private readonly criteriaMongoSchemaContainer: EntityMongoSchemaContainer<CriteriaMongo>,
  ) {}

  public get connection(): mongoose.Connection {
    if (hasValue(this.mongooseConnection)) {
      return this.mongooseConnection;
    } else {
      throw new Error(
        'Expected mongoose client to be initialized. Ensure a connection request was accomplished before.',
      );
    }
  }

  public async connect(): Promise<void> {
    console.log('Connecting to MongoDb');

    const mongooseConnectOptions: mongoose.ConnectOptions = {
      dbName: this.mongoConfig.database,
      pass: this.mongoConfig.password,
      useNewUrlParser: true,
      user: this.mongoConfig.username,
      useUnifiedTopology: true,
    };

    this.mongooseConnection = await mongoose.createConnection(
      this.mongoConfig.uri,
      mongooseConnectOptions,
    );

    console.log('Connected to MongoDb');

    this.registerModels();
  }

  public async disconnect(): Promise<void> {
    console.log('Disconnecting from MongoDb');

    await this.connection.close();

    this.mongooseConnection = undefined;

    console.log('Disconnected from MongoDb');
  }

  private registerModels(): void {
    const schemaContainers: EntityMongoSchemaContainer<EntityMongo>[] =
      this.getSchemaContainers();

    for (const schemaContainer of schemaContainers) {
      console.log(`Registering ${schemaContainer.modelName} mongoose model`);

      this.connection.model(schemaContainer.modelName, schemaContainer.schema);
    }
  }

  private getSchemaContainers(): EntityMongoSchemaContainer<EntityMongo>[] {
    const schemaContainers: EntityMongoSchemaContainer<EntityMongo>[] = [
      this.criteriaMongoSchemaContainer,
    ];

    return schemaContainers;
  }
}