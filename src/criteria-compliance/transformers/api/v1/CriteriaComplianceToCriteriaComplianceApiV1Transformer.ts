import * as inversify from 'inversify';

import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { CriteriaComplianceApiV1 } from '../../../fixtures/api/v1/CriteriaComplianceApiV1';
import { CriteriaCompliance } from '../../../models/domain/CriteriaCompliance';

@inversify.injectable()
export class CriteriaComplianceToCriteriaComplianceApiV1Transformer
  implements ITransformer<CriteriaCompliance, CriteriaComplianceApiV1>
{
  public async transform(
    criteriaCompliance: CriteriaCompliance,
  ): Promise<CriteriaComplianceApiV1> {
    const criteriaComplianceApiV1: CriteriaComplianceApiV1 = {
      compliance: criteriaCompliance.compliance,
      uuid: criteriaCompliance.uuid,
    };

    return criteriaComplianceApiV1;
  }
}
