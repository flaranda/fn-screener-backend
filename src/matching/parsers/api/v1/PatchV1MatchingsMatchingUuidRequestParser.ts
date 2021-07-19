import * as inversify from 'inversify';

import { hasValue } from '../../../../common/helpers/hasValue';
import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { ITypeGuard } from '../../../../common/interfaces/ITypeGuard';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { matchingInjectionTypes } from '../../../inversify/matchingInjectionTypes';
import { MatchingApiV1UpdateQuery } from '../../../models/api/v1/MatchingApiV1UpdateQuery';

@inversify.injectable()
export class PatchV1MatchingsMatchingUuidRequestParser
  implements IRequestParser<MatchingApiV1UpdateQuery>
{
  constructor(
    @inversify.inject(matchingInjectionTypes.MatchingApiV1UpdateQueryTypeGuard)
    private readonly matchingApiV1UpdateQueryTypeGuard: ITypeGuard<MatchingApiV1UpdateQuery>,
  ) {}

  public async parse(
    request: RequestWithContext,
  ): Promise<MatchingApiV1UpdateQuery> {
    const body: unknown = request.body;

    if (this.matchingApiV1UpdateQueryTypeGuard.is(body)) {
      const matchingApiV1UpdateQuery: MatchingApiV1UpdateQuery = {};

      if (hasValue(body.status)) {
        matchingApiV1UpdateQuery.status = body.status;
      }

      return matchingApiV1UpdateQuery;
    } else {
      throw new Error('Could not parse Request to MatchingApiV1UpdateQuery');
    }
  }
}
