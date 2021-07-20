import * as inversify from 'inversify';

import { IInteractor } from '../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../common/interfaces/ITransformer';
import { matchingInjectionTypes } from '../../inversify/matchingInjectionTypes';
import { Matching } from '../../models/domain/Matching';
import { MatchingAnalysis } from '../../models/domain/MatchingAnalysis';
import { MatchingAnalysisGenerationQuery } from '../../models/domain/MatchingAnalysisGenerationQuery';
import { MatchingMongoDocument } from '../../models/mongo/MatchingMongoDocument';
import { matchingMongoStatusToMatchingStatusMap } from '../../models/mongo/matchingMongoStatusToMatchingStatusMap';

@inversify.injectable()
export class MatchingMongoDocumentToMatchingTransformer
  implements ITransformer<MatchingMongoDocument, Matching>
{
  constructor(
    @inversify.inject(matchingInjectionTypes.GenerateMatchingAnalysisInteractor)
    private readonly generateMatchingAnalysisInteractor: IInteractor<
      MatchingAnalysisGenerationQuery,
      MatchingAnalysis
    >,
  ) {}

  public async transform(
    matchingMongoDocument: MatchingMongoDocument,
  ): Promise<Matching> {
    const matchingAnalysis: MatchingAnalysis =
      await this.transformToMatchingAnalysis(matchingMongoDocument);

    const matching: Matching = {
      analysis: matchingAnalysis,
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

  private async transformToMatchingAnalysis(
    matchingMongoDocument: MatchingMongoDocument,
  ): Promise<MatchingAnalysis> {
    const matchingAnalysisGenerationQuery: MatchingAnalysisGenerationQuery = {
      startupUuid: matchingMongoDocument.startup_uuid,
      userUuid: matchingMongoDocument.user_uuid,
    };

    const matchingAnalysis: MatchingAnalysis =
      await this.generateMatchingAnalysisInteractor.interact(
        matchingAnalysisGenerationQuery,
      );

    return matchingAnalysis;
  }
}
