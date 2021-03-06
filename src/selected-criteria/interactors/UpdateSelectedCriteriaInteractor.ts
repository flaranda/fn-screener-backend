import * as inversify from 'inversify';

import { IUpdateRepository } from '../../common/interfaces/IUpdateRepository';
import { UpdateEntityInteractor } from '../../common/modules/domain/UpdateEntityInteractor';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaUpdateQuery } from '../models/domain/SelectedCriteriaUpdateQuery';

@inversify.injectable()
export class UpdateSelectedCriteriaInteractor extends UpdateEntityInteractor<
  SelectedCriteriaUpdateQuery,
  SelectedCriteria
> {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaMongoUpdateRepository,
    )
    selectedCriteriaUpdateRepository: IUpdateRepository<
      SelectedCriteriaUpdateQuery,
      SelectedCriteria
    >,
  ) {
    super(selectedCriteriaUpdateRepository);
  }
}
