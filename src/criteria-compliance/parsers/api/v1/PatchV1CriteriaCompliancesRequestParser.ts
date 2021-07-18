import * as inversify from 'inversify';

import { hasValue } from '../../../../common/helpers/hasValue';
import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { ITypeGuard } from '../../../../common/interfaces/ITypeGuard';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { criteriaComplianceInjectionTypes } from '../../../inversify/criteriaComplianceInjectionTypes';
import { CriteriaComplianceApiV1UpdateQuery } from '../../../models/api/v1/CriteriaComplianceApiV1UpdateQuery';

@inversify.injectable()
export class PatchV1CriteriaCompliancesRequestParser
  implements IRequestParser<CriteriaComplianceApiV1UpdateQuery>
{
  constructor(
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceApiV1UpdateQueryTypeGuard,
    )
    private readonly criteriaComplianceApiV1UpdateQueryTypeGuard: ITypeGuard<CriteriaComplianceApiV1UpdateQuery>,
  ) {}

  public async parse(
    request: RequestWithContext,
  ): Promise<CriteriaComplianceApiV1UpdateQuery> {
    const body: unknown = request.body;

    if (this.criteriaComplianceApiV1UpdateQueryTypeGuard.is(body)) {
      const criteriaComplianceApiV1UpdateQuery: CriteriaComplianceApiV1UpdateQuery =
        {};

      if (hasValue(body.compliance)) {
        criteriaComplianceApiV1UpdateQuery.compliance = body.compliance;
      }

      return criteriaComplianceApiV1UpdateQuery;
    } else {
      throw new Error(
        'Could not parse Request to CriteriaComplianceApiV1UpdateQuery',
      );
    }
  }
}
