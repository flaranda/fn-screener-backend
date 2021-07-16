import { Entity } from '../models/domain/Entity';
import { EntityFindQuery } from '../models/domain/EntityFindQuery';

export interface IFindManyRepository<
  TFindQuery extends EntityFindQuery,
  TModel extends Entity,
> {
  findMany(findQuery: TFindQuery): Promise<TModel[]>;
}
