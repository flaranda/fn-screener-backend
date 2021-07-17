import * as inversify from 'inversify';

import { IFindOneRepository } from '../../common/interfaces/IFindOneRepository';
import { FindOneEntityInteractor } from '../../common/modules/domain/FindOneEntityInteractor';
import { criteriaInjectionTypes } from '../inversify/criteriaInjectionTypes';
import { Criteria } from '../models/domain/Criteria';
import { CriteriaFindQuery } from '../models/domain/CriteriaFindQuery';

@inversify.injectable()
export class FindOneCriteriaInteractor extends FindOneEntityInteractor<
  CriteriaFindQuery,
  Criteria
> {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriaMongoFindOneRepository)
    criteriaFindOneRepository: IFindOneRepository<CriteriaFindQuery, Criteria>,
  ) {
    super(criteriaFindOneRepository);
  }
}
