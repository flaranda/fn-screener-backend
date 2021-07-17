import { Entity } from '../models/domain/Entity';
import { EntityFindQuery } from '../models/domain/EntityFindQuery';

export interface IFindOneRepository<
  TFindQuery extends EntityFindQuery,
  TModel extends Entity,
> {
  findOne(findQuery: TFindQuery): Promise<TModel>;
}
