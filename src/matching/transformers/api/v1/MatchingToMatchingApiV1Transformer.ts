import * as inversify from 'inversify';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { startupInjectionTypes } from '../../../../startup/inversify/startupInjectionTypes';
import { Startup } from '../../../../startup/models/domain/Startup';
import { StartupFindQuery } from '../../../../startup/models/domain/StartupFindQuery';
import { MatchingApiV1 } from '../../../models/api/v1/MatchingApiV1';
import { MatchingApiV1Analysis } from '../../../models/api/v1/MatchingApiV1Analysis';
import { MatchingApiV1AnalysisCriteriaResult } from '../../../models/api/v1/MatchingApiV1AnalysisCriteriaResult';
import { matchingStatusToMatchingApiV1StatusMap } from '../../../models/api/v1/matchingStatusToMatchingApiV1StatusMap';
import { Matching } from '../../../models/domain/Matching';

@inversify.injectable()
export class MatchingToMatchingApiV1Transformer
  implements ITransformer<Matching, MatchingApiV1>
{
  constructor(
    @inversify.inject(startupInjectionTypes.FindOneStartupInteractor)
    private readonly findOneStartupInteractor: IInteractor<
      StartupFindQuery,
      Startup
    >,
  ) {}
  public async transform(matching: Matching): Promise<MatchingApiV1> {
    const startup: Startup = await this.transformToStartup(matching);

    const matchingApiV1AnalysisCriteriaResult: MatchingApiV1AnalysisCriteriaResult =
      {
        accomplished: matching.analysis.mustHaveCriteriaResult.accomplished,
        non_accomplished:
          matching.analysis.mustHaveCriteriaResult.nonAccomplished,
        unanswered: matching.analysis.mustHaveCriteriaResult.unanswered,
      };

    const matchingApiV1AnalysisCriteriaResult2: MatchingApiV1AnalysisCriteriaResult =
      {
        accomplished: matching.analysis.niceToHaveCriteriaResult.accomplished,
        non_accomplished:
          matching.analysis.niceToHaveCriteriaResult.nonAccomplished,
        unanswered: matching.analysis.niceToHaveCriteriaResult.unanswered,
      };

    const matchingApiV1AnalysisCriteriaResult3: MatchingApiV1AnalysisCriteriaResult =
      {
        accomplished:
          matching.analysis.superNiceToHaveCriteriaResult.accomplished,
        non_accomplished:
          matching.analysis.superNiceToHaveCriteriaResult.nonAccomplished,
        unanswered: matching.analysis.superNiceToHaveCriteriaResult.unanswered,
      };

    const matchingApiV1Analysis: MatchingApiV1Analysis = {
      must_have_criteria_result: matchingApiV1AnalysisCriteriaResult,
      nice_to_have_criteria_result: matchingApiV1AnalysisCriteriaResult2,
      score: matching.analysis.score,
      super_nice_to_have_criteria_result: matchingApiV1AnalysisCriteriaResult3,
    };

    const matchingApiV1: MatchingApiV1 = {
      analysis: matchingApiV1Analysis,
      startup_name: startup.name,
      startup_url: startup.url.href,
      startup_uuid: matching.startupUuid,
      status: matchingStatusToMatchingApiV1StatusMap[matching.status],
      uuid: matching.uuid,
    };

    return matchingApiV1;
  }

  private async transformToStartup(matching: Matching): Promise<Startup> {
    const startupFindQuery: StartupFindQuery = {
      uuid: matching.startupUuid,
    };

    const startup: Startup = await this.findOneStartupInteractor.interact(
      startupFindQuery,
    );

    return startup;
  }
}
