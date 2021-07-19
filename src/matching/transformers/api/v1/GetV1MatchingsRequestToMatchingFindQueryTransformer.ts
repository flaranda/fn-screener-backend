import { getRequestContext } from '../../../../common/helpers/getRequestContext';
import { hasValue } from '../../../../common/helpers/hasValue';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { User } from '../../../../user/models/domain/User';
import { MatchingFindQuery } from '../../../models/domain/MatchingFindQuery';

export class GetV1MatchingsRequestToMatchingFindQueryTransformer
  implements ITransformer<RequestWithContext, MatchingFindQuery>
{
  public async transform(
    request: RequestWithContext,
  ): Promise<MatchingFindQuery> {
    const requestContext: RequestContext = getRequestContext(request);

    const user: User | undefined = requestContext.user;

    let matchingFindQuery: MatchingFindQuery;

    if (hasValue(user)) {
      matchingFindQuery = {
        userUuid: user.uuid,
      };
    } else {
      throw new Error('User not present in Request');
    }

    return matchingFindQuery;
  }
}
