import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { hasValue } from '../../helpers/hasValue';
import { ITransformer } from '../../interfaces/ITransformer';
import { IUpdateRepository } from '../../interfaces/IUpdateRepository';
import { Entity } from '../../models/domain/Entity';
import { EntityUpdateQuery } from '../../models/domain/EntityUpdateQuery';
import { EntityMongo } from '../../models/mongo/EntityMongo';
import { EntityMongoDocument } from '../../models/mongo/EntityMongoDocument';
import { EntityMongoModelName } from '../../models/mongo/EntityMongoModelName';

@inversify.injectable()
export abstract class EntityMongoUpdateRepository<
  TEntityUpdateQuery extends EntityUpdateQuery = EntityUpdateQuery,
  TEntity extends Entity = Entity,
  TEntityMongo extends EntityMongo = EntityMongo,
  TEntityMongoDocument extends EntityMongoDocument = EntityMongoDocument,
> implements IUpdateRepository<TEntityUpdateQuery, TEntity>
{
  protected get model(): mongoose.Model<TEntityMongo> {
    const model: mongoose.Model<TEntityMongo> =
      this.mongoDatasource.connection.model<TEntityMongo>(
        this.entityMongoModelName,
      );

    return model;
  }

  constructor(
    @inversify.unmanaged()
    private readonly mongoDatasource: MongoDatasource,
    @inversify.unmanaged()
    private readonly entityMongoDocumentToEntityTransformer: ITransformer<
      TEntityMongoDocument,
      TEntity
    >,
    @inversify.unmanaged()
    private readonly entityMongoModelName: EntityMongoModelName,
  ) {}

  public async update(entityUpdateQuery: TEntityUpdateQuery): Promise<TEntity> {
    const mongooseFilterQuery: mongoose.FilterQuery<EntityMongo> = {
      uuid: entityUpdateQuery.uuid,
    };

    const mongooseUpdateQuery: mongoose.UpdateQuery<TEntityMongo> =
      this.transformEntityUpdateQueryToMogooseUpdateQuery(entityUpdateQuery);

    const mongooseQueryOptions: mongoose.QueryOptions = {
      new: true,
      useFindAndModify: false,
    };

    const entityMongoDocument: EntityMongoDocument | null =
      await this.model.findOneAndUpdate(
        mongooseFilterQuery,
        mongooseUpdateQuery,
        mongooseQueryOptions,
      );

    let entity: TEntity;

    if (hasValue(entityMongoDocument)) {
      entity = await this.entityMongoDocumentToEntityTransformer.transform(
        entityMongoDocument as TEntityMongoDocument,
      );
    } else {
      throw new Error(`Entity ${this.entityMongoModelName} not found`);
    }

    return entity;
  }

  private transformEntityUpdateQueryToMogooseUpdateQuery(
    entityUpdateQuery: TEntityUpdateQuery,
  ): mongoose.UpdateQuery<TEntityMongo> {
    const currentDate: Date = new Date();

    const baseMongooseUpdateQuery: mongoose.UpdateQuery<EntityMongo> = {
      updated_at: currentDate,
    };

    const mongooseUpdateQuery: mongoose.UpdateQuery<TEntityMongo> =
      this.buildMongooseUpdateQueryFromBaseMongooseUpdateQueryAndEntityUpdateQuery(
        baseMongooseUpdateQuery,
        entityUpdateQuery,
      );

    return mongooseUpdateQuery;
  }

  protected abstract buildMongooseUpdateQueryFromBaseMongooseUpdateQueryAndEntityUpdateQuery(
    baseMongooseUpdateQuery: mongoose.UpdateQuery<EntityMongo>,
    entityUpdateQuery: TEntityUpdateQuery,
  ): mongoose.UpdateQuery<TEntityMongo>;
}
