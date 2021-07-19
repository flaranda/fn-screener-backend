import * as inversify from 'inversify';

import { getRequestContext } from '../../../../common/helpers/getRequestContext';
import { hasValue } from '../../../../common/helpers/hasValue';
import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { criteriaComplianceInjectionTypes } from '../../../inversify/criteriaComplianceInjectionTypes';
import { CriteriaComplianceApiV1UpdateQuery } from '../../../models/api/v1/CriteriaComplianceApiV1UpdateQuery';
import { CriteriaCompliance } from '../../../models/domain/CriteriaCompliance';
import { CriteriaComplianceUpdateQuery } from '../../../models/domain/CriteriaComplianceUpdateQuery';

@inversify.injectable()
export class PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer
  implements ITransformer<RequestWithContext, CriteriaComplianceUpdateQuery>
{
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser,
    )
    private readonly patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser: IRequestParser<CriteriaComplianceApiV1UpdateQuery>,
  ) {}

  public async transform(
    request: RequestWithContext,
  ): Promise<CriteriaComplianceUpdateQuery> {
    const requestContext: RequestContext = getRequestContext(request);

    const criteriaCompliance: CriteriaCompliance | undefined =
      requestContext.criteriaCompliance;

    let criteriaComplianceUpdateQuery: CriteriaComplianceUpdateQuery;

    if (hasValue(criteriaCompliance)) {
      const criteriaComplianceApiV1UpdateQuery: CriteriaComplianceApiV1UpdateQuery =
        await this.patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse(
          request,
        );

      criteriaComplianceUpdateQuery = {
        uuid: criteriaCompliance.uuid,
      };

      if (hasValue(criteriaComplianceApiV1UpdateQuery.compliance)) {
        criteriaComplianceUpdateQuery.compliance =
          criteriaComplianceApiV1UpdateQuery.compliance;
      }
    } else {
      throw new Error('CriteriaCompliance not present in Request');
    }

    return criteriaComplianceUpdateQuery;
  }
}
