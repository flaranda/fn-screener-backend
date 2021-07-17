import * as inversify from 'inversify';

import { IFindManyRepository } from '../../common/interfaces/IFindManyRepository';
import { FindManyEntitiesInteractor } from '../../common/modules/domain/FindManyEntitiesInteractor';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../models/domain/SelectedCriteriaFindQuery';

@inversify.injectable()
export class FindManySelectedCriteriasInteractor extends FindManyEntitiesInteractor<
  SelectedCriteriaFindQuery,
  SelectedCriteria
> {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaMongoFindManyRepository,
    )
    criteriaFindManyRepository: IFindManyRepository<
      SelectedCriteriaFindQuery,
      SelectedCriteria
    >,
  ) {
    super(criteriaFindManyRepository);
  }
}
