import * as inversify from 'inversify';

import { IFindOneRepository } from '../../common/interfaces/IFindOneRepository';
import { FindOneEntityInteractor } from '../../common/modules/domain/FindOneEntityInteractor';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../models/domain/SelectedCriteriaFindQuery';

@inversify.injectable()
export class FindOneSelectedCriteriaInteractor extends FindOneEntityInteractor<
  SelectedCriteriaFindQuery,
  SelectedCriteria
> {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaMongoFindOneRepository,
    )
    selectedCriteriaFindOneRepository: IFindOneRepository<
      SelectedCriteriaFindQuery,
      SelectedCriteria
    >,
  ) {
    super(selectedCriteriaFindOneRepository);
  }
}
