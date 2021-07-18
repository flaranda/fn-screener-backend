import * as inversify from 'inversify';

import { IInteractor } from '../../interfaces/IInteractor';
import { IUpdateRepository } from '../../interfaces/IUpdateRepository';
import { Entity } from '../../models/domain/Entity';
import { EntityUpdateQuery } from '../../models/domain/EntityUpdateQuery';

@inversify.injectable()
export abstract class UpdateEntityInteractor<
  TEntityUpdateQuery extends EntityUpdateQuery = EntityUpdateQuery,
  TEntity extends Entity = Entity,
> implements IInteractor<TEntityUpdateQuery, TEntity>
{
  constructor(
    @inversify.unmanaged()
    private readonly updateRepository: IUpdateRepository<
      TEntityUpdateQuery,
      TEntity
    >,
  ) {}

  public async interact(
    entityUpdateQuery: TEntityUpdateQuery,
  ): Promise<TEntity> {
    const entity: TEntity = await this.updateRepository.update(
      entityUpdateQuery,
    );

    return entity;
  }
}
