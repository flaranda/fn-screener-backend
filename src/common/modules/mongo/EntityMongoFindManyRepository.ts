import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { IFindManyRepository } from '../../interfaces/IFindManyRepository';
import { ITransformer } from '../../interfaces/ITransformer';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';
import { EntityMongo } from '../../models/mongo/EntityMongo';
import { EntityMongoDocument } from '../../models/mongo/EntityMongoDocument';
import { EntityMongoModelName } from '../../models/mongo/EntityMongoModelName';

@inversify.injectable()
export abstract class EntityMongoFindManyRepository<
  TEntityFindQuery extends EntityFindQuery = EntityFindQuery,
  TEntity extends Entity = Entity,
  TEntityMongo extends EntityMongo = EntityMongo,
  TEntityMongoDocument extends EntityMongoDocument = EntityMongoDocument,
> implements IFindManyRepository<TEntityFindQuery, TEntity>
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

  public async findMany(entityFindQuery: TEntityFindQuery): Promise<TEntity[]> {
    const filterQuery: mongoose.FilterQuery<TEntityMongo> =
      this.transformEntityFindQueryToMongooseFilterQuery(entityFindQuery);

    const entitiesMongo: EntityMongoDocument[] = await this.model.find(
      filterQuery,
    );

    const entities: TEntity[] = await Promise.all(
      entitiesMongo.map(async (entityMongoDocument: EntityMongoDocument) =>
        this.entityMongoDocumentToEntityTransformer.transform(
          entityMongoDocument as TEntityMongoDocument,
        ),
      ),
    );

    return entities;
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
