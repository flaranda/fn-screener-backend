import { MatchingApiV1Analysis } from '../../../models/api/v1/MatchingApiV1Analysis';
import { MatchingApiV1AnalysisCriteriaResultFixture } from './MatchingApiV1AnalysisCriteriaResultFixtures';

export class MatchingApiV1AnalysisFixtures {
  public static get withMandatory(): MatchingApiV1Analysis {
    const fixture: MatchingApiV1Analysis = {
      must_have_criteria_result:
        MatchingApiV1AnalysisCriteriaResultFixture.withMandatory,
      nice_to_have_criteria_result:
        MatchingApiV1AnalysisCriteriaResultFixture.withMandatory,
      score: 0,
      super_nice_to_have_criteria_result:
        MatchingApiV1AnalysisCriteriaResultFixture.withMandatory,
    };

    return fixture;
  }
}
