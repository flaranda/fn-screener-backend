import * as inversify from 'inversify';

import { getRequestContext } from '../../../../common/helpers/getRequestContext';
import { hasValue } from '../../../../common/helpers/hasValue';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { Startup } from '../../../../startup/models/domain/Startup';
import { CriteriaComplianceFindQuery } from '../../../models/domain/CriteriaComplianceFindQuery';

@inversify.injectable()
export class GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer
  implements ITransformer<RequestWithContext, CriteriaComplianceFindQuery>
{
  public async transform(
    request: RequestWithContext,
  ): Promise<CriteriaComplianceFindQuery> {
    const requestContext: RequestContext = getRequestContext(request);

    const startup: Startup | undefined = requestContext.startup;

    let criteriaComplianceFindQuery: CriteriaComplianceFindQuery;

    if (hasValue(startup)) {
      criteriaComplianceFindQuery = {
        startupUuid: startup.uuid,
      };
    } else {
      throw new Error('Startup not present in Request');
    }

    return criteriaComplianceFindQuery;
  }
}
