import * as inversify from 'inversify';

import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { MatchingApiV1 } from '../../../models/api/v1/MatchingApiV1';
import { matchingStatusToMatchingApiV1StatusMap } from '../../../models/api/v1/matchingStatusToMatchingApiV1StatusMap';
import { Matching } from '../../../models/domain/Matching';

@inversify.injectable()
export class MatchingToMatchingApiV1Transformer
  implements ITransformer<Matching, MatchingApiV1>
{
  public async transform(matching: Matching): Promise<MatchingApiV1> {
    const matchingApiV1: MatchingApiV1 = {
      status: matchingStatusToMatchingApiV1StatusMap[matching.status],
    };

    return matchingApiV1;
  }
}
