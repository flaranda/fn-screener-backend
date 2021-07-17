import * as inversify from 'inversify';

import { IFindManyRepository } from '../../common/interfaces/IFindManyRepository';
import { FindManyEntitiesInteractor } from '../../common/modules/domain/FindManyEntitiesInteractor';
import { criteriaInjectionTypes } from '../inversify/criteriaInjectionTypes';
import { Criteria } from '../models/domain/Criteria';
import { CriteriaFindQuery } from '../models/domain/CriteriaFindQuery';

@inversify.injectable()
export class FindManyCriteriasInteractor extends FindManyEntitiesInteractor<
  CriteriaFindQuery,
  Criteria
> {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriaMongoFindManyRepository)
    criteriaFindManyRepository: IFindManyRepository<
      CriteriaFindQuery,
      Criteria
    >,
  ) {
    super(criteriaFindManyRepository);
  }
}
