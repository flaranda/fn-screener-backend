import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { hasValue } from '../../helpers/hasValue';
import { IFindOneRepository } from '../../interfaces/IFindOneRepository';
import { ITransformer } from '../../interfaces/ITransformer';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';
import { EntityMongo } from '../../models/mongo/EntityMongo';
import { EntityMongoDocument } from '../../models/mongo/EntityMongoDocument';
import { EntityMongoModelName } from '../../models/mongo/EntityMongoModelName';

@inversify.injectable()
export abstract class EntityMongoFindOneRepository<
  TEntityFindQuery extends EntityFindQuery = EntityFindQuery,
  TEntity extends Entity = Entity,
  TEntityMongo extends EntityMongo = EntityMongo,
  TEntityMongoDocument extends EntityMongoDocument = EntityMongoDocument,
> implements IFindOneRepository<TEntityFindQuery, TEntity>
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

  public async findOne(entityFindQuery: TEntityFindQuery): Promise<TEntity> {
    const filterQuery: mongoose.FilterQuery<TEntityMongo> =
      this.transformEntityFindQueryToMongooseFilterQuery(entityFindQuery);

    const entityMongoDocument: EntityMongoDocument | null =
      await this.model.findOne(filterQuery);

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

  private transformEntityFindQueryToMongooseFilterQuery(
    entityFindQuery: TEntityFindQuery,
  ): mongoose.FilterQuery<TEntityMongo> {
    const baseMongooseFilterQuery: mongoose.FilterQuery<EntityMongo> = {};

    if ('uuid' in entityFindQuery) {
      baseMongooseFilterQuery.uuid = entityFindQuery.uuid;
    }

    const mongooseFilterQuery: mongoose.FilterQuery<TEntityMongo> =
      this.hydrateBaseMongooseFilterQueryFromEntityFindQuery(
        baseMongooseFilterQuery,
        entityFindQuery,
      );

    return mongooseFilterQuery;
  }

  protected abstract hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    baseMongooseFilterQuery: mongoose.FilterQuery<EntityMongo>,
    entityFindQuery: TEntityFindQuery,
  ): mongoose.FilterQuery<EntityMongo>;
}
