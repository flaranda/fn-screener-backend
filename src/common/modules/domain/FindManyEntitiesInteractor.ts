import * as inversify from 'inversify';

import { IFindManyRepository } from '../../interfaces/IFindManyRepository';
import { IInteractor } from '../../interfaces/IInteractor';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';

@inversify.injectable()
export abstract class FindManyEntitiesInteractor<
  TEntityFindQuery extends EntityFindQuery = EntityFindQuery,
  TEntity extends Entity = Entity,
> implements IInteractor<TEntityFindQuery, TEntity[]>
{
  constructor(
    @inversify.unmanaged()
    private readonly findManyRepository: IFindManyRepository<
      TEntityFindQuery,
      TEntity
    >,
  ) {}

  public async interact(entityFindQuery: TEntityFindQuery): Promise<TEntity[]> {
    const entities: TEntity[] = await this.findManyRepository.findMany(
      entityFindQuery,
    );

    return entities;
  }
}
