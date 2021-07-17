import * as inversify from 'inversify';

import { IFindManyRepository } from '../../common/interfaces/IFindManyRepository';
import { FindManyEntitiesInteractor } from '../../common/modules/domain/FindManyEntitiesInteractor';
import { userCriteriaInjectionTypes } from '../inversify/userCriteriaInjectionTypes';
import { UserCriteria } from '../models/domain/UserCriteria';
import { UserCriteriaFindQuery } from '../models/domain/UserCriteriaFindQuery';

@inversify.injectable()
export class FindManyUserCriteriasInteractor extends FindManyEntitiesInteractor<
  UserCriteriaFindQuery,
  UserCriteria
> {
  constructor(
    @inversify.inject(
      userCriteriaInjectionTypes.UserCriteriaMongoFindManyRepository,
    )
    criteriaFindManyRepository: IFindManyRepository<
      UserCriteriaFindQuery,
      UserCriteria
    >,
  ) {
    super(criteriaFindManyRepository);
  }
}
