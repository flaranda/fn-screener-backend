import { MatchingAnalysisCriteriaResult } from '../../models/domain/MatchingAnalysisCriteriaResult';

export class MatchingAnalysisCriteriaResultFixture {
  public static get withMandatory(): MatchingAnalysisCriteriaResult {
    const fixture: MatchingAnalysisCriteriaResult = {
      accomplished: 0,
      nonAccomplished: 0,
      unanswered: 0,
    };

    return fixture;
  }
}
