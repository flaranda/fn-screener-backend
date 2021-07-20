import { MatchingApiV1AnalysisCriteriaResult } from '../../../models/api/v1/MatchingApiV1AnalysisCriteriaResult';

export class MatchingApiV1AnalysisCriteriaResultFixture {
  public static get withMandatory(): MatchingApiV1AnalysisCriteriaResult {
    const fixture: MatchingApiV1AnalysisCriteriaResult = {
      accomplished: 0,
      non_accomplished: 0,
      unanswered: 0,
    };

    return fixture;
  }
}
