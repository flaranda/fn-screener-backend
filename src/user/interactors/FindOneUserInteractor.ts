import * as inversify from 'inversify';

import { IFindOneRepository } from '../../common/interfaces/IFindOneRepository';
import { FindOneEntityInteractor } from '../../common/modules/domain/FindOneEntityInteractor';
import { userInjectionTypes } from '../inversify/userInjectionTypes';
import { User } from '../models/domain/User';
import { UserFindQuery } from '../models/domain/UserFindQuery';

@inversify.injectable()
export class FindOneUserInteractor extends FindOneEntityInteractor<
  UserFindQuery,
  User
> {
  constructor(
    @inversify.inject(userInjectionTypes.UserMongoFindOneRepository)
    userFindOneRepository: IFindOneRepository<UserFindQuery, User>,
  ) {
    super(userFindOneRepository);
  }
}
