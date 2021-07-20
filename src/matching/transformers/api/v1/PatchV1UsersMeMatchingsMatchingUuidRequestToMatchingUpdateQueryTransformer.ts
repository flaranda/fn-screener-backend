import * as inversify from 'inversify';

import { getRequestContext } from '../../../../common/helpers/getRequestContext';
import { hasValue } from '../../../../common/helpers/hasValue';
import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { matchingInjectionTypes } from '../../../inversify/matchingInjectionTypes';
import { matchingApiV1StatusToMatchingStatusMap } from '../../../models/api/v1/matchingApiV1StatusToMatchingStatusMap';
import { MatchingApiV1UpdateQuery } from '../../../models/api/v1/MatchingApiV1UpdateQuery';
import { Matching } from '../../../models/domain/Matching';
import { MatchingUpdateQuery } from '../../../models/domain/MatchingUpdateQuery';

@inversify.injectable()
export class PatchV1UsersMeMatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer
  implements ITransformer<RequestWithContext, MatchingUpdateQuery>
{
  constructor(
    @inversify.inject(
      matchingInjectionTypes.PatchV1UsersMeMatchingsMatchingUuidRequestParser,
    )
    private readonly patchV1MatchingsMatchingUuidRequestParser: IRequestParser<MatchingApiV1UpdateQuery>,
  ) {}

  public async transform(
    request: RequestWithContext,
  ): Promise<MatchingUpdateQuery> {
    const requestContext: RequestContext = getRequestContext(request);

    const matching: Matching | undefined = requestContext.matching;

    let matchingUpdateQuery: MatchingUpdateQuery;

    if (hasValue(matching)) {
      const matchingApiV1UpdateQuery: MatchingApiV1UpdateQuery =
        await this.patchV1MatchingsMatchingUuidRequestParser.parse(request);

      matchingUpdateQuery = {
        uuid: matching.uuid,
      };

      if (hasValue(matchingApiV1UpdateQuery.status)) {
        matchingUpdateQuery.status =
          matchingApiV1StatusToMatchingStatusMap[
            matchingApiV1UpdateQuery.status
          ];
      }

      if (hasValue(matchingApiV1UpdateQuery.status_reason)) {
        matchingUpdateQuery.statusReason =
          matchingApiV1UpdateQuery.status_reason;
      }
    } else {
      throw new Error('Matching not present in Request');
    }

    return matchingUpdateQuery;
  }
}
