import * as inversify from 'inversify';

import { IFindManyRepository } from '../../common/interfaces/IFindManyRepository';
import { FindManyEntitiesInteractor } from '../../common/modules/domain/FindManyEntitiesInteractor';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../models/domain/CriteriaComplianceFindQuery';

@inversify.injectable()
export class FindManyCriteriaCompliancesInteractor extends FindManyEntitiesInteractor<
  CriteriaComplianceFindQuery,
  CriteriaCompliance
> {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceMongoFindManyRepository,
    )
    criteriaComplianceFindManyRepository: IFindManyRepository<
      CriteriaComplianceFindQuery,
      CriteriaCompliance
    >,
  ) {
    super(criteriaComplianceFindManyRepository);
  }
}
