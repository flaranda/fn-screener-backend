import * as inversify from 'inversify';

import { IFindOneRepository } from '../../common/interfaces/IFindOneRepository';
import { FindOneEntityInteractor } from '../../common/modules/domain/FindOneEntityInteractor';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../models/domain/CriteriaComplianceFindQuery';

@inversify.injectable()
export class FindOneCriteriaComplianceInteractor extends FindOneEntityInteractor<
  CriteriaComplianceFindQuery,
  CriteriaCompliance
> {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceMongoFindOneRepository,
    )
    criteriaFindOneRepository: IFindOneRepository<
      CriteriaComplianceFindQuery,
      CriteriaCompliance
    >,
  ) {
    super(criteriaFindOneRepository);
  }
}
