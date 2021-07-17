import * as inversify from 'inversify';

import { IFindOneRepository } from '../../interfaces/IFindOneRepository';
import { IInteractor } from '../../interfaces/IInteractor';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';

@inversify.injectable()
export abstract class FindOneEntityInteractor<
  TFindQuery extends EntityFindQuery = EntityFindQuery,
  TEntity extends Entity = Entity,
> implements IInteractor<TFindQuery, TEntity>
{
  constructor(
    @inversify.unmanaged()
    private readonly findOneRepository: IFindOneRepository<TFindQuery, TEntity>,
  ) {}

  public async interact(entityFindQuery: TFindQuery): Promise<TEntity> {
    const entity: TEntity = await this.findOneRepository.findOne(
      entityFindQuery,
    );

    return entity;
  }
}
