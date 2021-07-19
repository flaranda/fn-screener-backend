import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { Matching } from '../../models/domain/Matching';
import { MatchingMongoDocument } from '../../models/mongo/MatchingMongoDocument';
import { matchingMongoStatusToMatchingStatusMap } from '../../models/mongo/matchingMongoStatusToMatchingStatusMap';

@inversify.injectable()
export class MatchingMongoDocumentToMatchingTransformer
  implements ITransformer<MatchingMongoDocument, Matching>
{
  public async transform(
    matchingMongoDocument: MatchingMongoDocument,
  ): Promise<Matching> {
    const matching: Matching = {
      createdAt: matchingMongoDocument.created_at,
      startupUuid: matchingMongoDocument.startup_uuid,
      status:
        matchingMongoStatusToMatchingStatusMap[matchingMongoDocument.status],
      updatedAt: matchingMongoDocument.updated_at,
      userUuid: matchingMongoDocument.user_uuid,
      uuid: matchingMongoDocument.uuid,
    };

    return matching;
  }
}
