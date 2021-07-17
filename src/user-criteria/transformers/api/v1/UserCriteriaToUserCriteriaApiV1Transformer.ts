import * as inversify from 'inversify';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { criteriaInjectionTypes } from '../../../../criteria/inversify/criteriaInjectionTypes';
import { Criteria } from '../../../../criteria/models/domain/Criteria';
import { CriteriaFindQuery } from '../../../../criteria/models/domain/CriteriaFindQuery';
import { UserCriteriaApiV1 } from '../../../models/api/v1/UserCriteriaApiV1';
import { userCriteriaImportanceToUserCriteriaApiV1ImportanceMap } from '../../../models/api/v1/userCriteriaImportanceToUserCriteriaApiV1ImportanceMap';
import { UserCriteria } from '../../../models/domain/UserCriteria';

@inversify.injectable()
export class UserCriteriaToUserCriteriaApiV1Transformer
  implements ITransformer<UserCriteria, UserCriteriaApiV1>
{
  constructor(
    @inversify.inject(criteriaInjectionTypes.FindOneCriteriaInteractor)
    private readonly findOneCriteriaInteractor: IInteractor<
      CriteriaFindQuery,
      Criteria
    >,
  ) {}

  public async transform(
    userCriteria: UserCriteria,
  ): Promise<UserCriteriaApiV1> {
    const criteria: Criteria = await this.transformToCriteria(userCriteria);

    const userCriteriaApiV1: UserCriteriaApiV1 = {
      criteria_name: criteria.name,
      importance:
        userCriteriaImportanceToUserCriteriaApiV1ImportanceMap[
          userCriteria.importance
        ],
      uuid: userCriteria.uuid,
    };

    return userCriteriaApiV1;
  }

  private async transformToCriteria(
    userCriteria: UserCriteria,
  ): Promise<Criteria> {
    const criteriaFindQuery: CriteriaFindQuery = {
      uuid: userCriteria.criteriaUuid,
    };

    const criteria: Criteria = await this.findOneCriteriaInteractor.interact(
      criteriaFindQuery,
    );

    return criteria;
  }
}
