import * as inversify from 'inversify';

import { IUpdateRepository } from '../../common/interfaces/IUpdateRepository';
import { UpdateEntityInteractor } from '../../common/modules/domain/UpdateEntityInteractor';
import { criteriaComplianceInjectionTypes } from '../inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceUpdateQuery } from '../models/domain/CriteriaComplianceUpdateQuery';

@inversify.injectable()
export class UpdateCriteriaComplianceInteractor extends UpdateEntityInteractor<
  CriteriaComplianceUpdateQuery,
  CriteriaCompliance
> {
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceMongoUpdateRepository,
    )
    criteriaComplianceUpdateRepository: IUpdateRepository<
      CriteriaComplianceUpdateQuery,
      CriteriaCompliance
    >,
  ) {
    super(criteriaComplianceUpdateRepository);
  }
}
