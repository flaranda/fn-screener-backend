import { Entity } from '../models/domain/Entity';
import { EntityUpdateQuery } from '../models/domain/EntityUpdateQuery';

export interface IUpdateRepository<
  TEntityUpdateQuery extends EntityUpdateQuery,
  TModel extends Entity,
> {
  update(entityUpdateQuery: TEntityUpdateQuery): Promise<TModel>;
}
