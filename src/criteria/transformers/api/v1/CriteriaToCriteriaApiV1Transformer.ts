import * as inversify from 'inversify';

import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { CriteriaApiV1 } from '../../../models/api/v1/CriteriaApiV1';
import { Criteria } from '../../../models/domain/Criteria';

@inversify.injectable()
export class CriteriaToCriteriaApiV1Transformer
  implements ITransformer<Criteria, CriteriaApiV1>
{
  public async transform(criteria: Criteria): Promise<CriteriaApiV1> {
    const criteriaApiV1: CriteriaApiV1 = {
      name: criteria.name,
      uuid: criteria.uuid,
    };

    return criteriaApiV1;
  }
}
