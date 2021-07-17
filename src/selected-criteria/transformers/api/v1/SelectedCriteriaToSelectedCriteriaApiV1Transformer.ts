import * as inversify from 'inversify';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { criteriaInjectionTypes } from '../../../../criteria/inversify/criteriaInjectionTypes';
import { Criteria } from '../../../../criteria/models/domain/Criteria';
import { CriteriaFindQuery } from '../../../../criteria/models/domain/CriteriaFindQuery';
import { SelectedCriteriaApiV1 } from '../../../models/api/v1/SelectedCriteriaApiV1';
import { selectedCriteriaImportanceToSelectedCriteriaApiV1ImportanceMap } from '../../../models/api/v1/selectedCriteriaImportanceToSelectedCriteriaApiV1ImportanceMap';
import { SelectedCriteria } from '../../../models/domain/SelectedCriteria';

@inversify.injectable()
export class SelectedCriteriaToSelectedCriteriaApiV1Transformer
  implements ITransformer<SelectedCriteria, SelectedCriteriaApiV1>
{
  constructor(
    @inversify.inject(criteriaInjectionTypes.FindOneCriteriaInteractor)
    private readonly findOneCriteriaInteractor: IInteractor<
      CriteriaFindQuery,
      Criteria
    >,
  ) {}

  public async transform(
    selectedCriteria: SelectedCriteria,
  ): Promise<SelectedCriteriaApiV1> {
    const criteria: Criteria = await this.transformToCriteria(selectedCriteria);

    const selectedCriteriaApiV1: SelectedCriteriaApiV1 = {
      criteria_name: criteria.name,
      importance:
        selectedCriteriaImportanceToSelectedCriteriaApiV1ImportanceMap[
          selectedCriteria.importance
        ],
      uuid: selectedCriteria.uuid,
    };

    return selectedCriteriaApiV1;
  }

  private async transformToCriteria(
    selectedCriteria: SelectedCriteria,
  ): Promise<Criteria> {
    const criteriaFindQuery: CriteriaFindQuery = {
      uuid: selectedCriteria.criteriaUuid,
    };

    const criteria: Criteria = await this.findOneCriteriaInteractor.interact(
      criteriaFindQuery,
    );

    return criteria;
  }
}
