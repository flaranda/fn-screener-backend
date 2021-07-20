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

  public static get withAccomplishedOne(): MatchingAnalysisCriteriaResult {
    const fixture: MatchingAnalysisCriteriaResult = {
      ...this.withMandatory,
      accomplished: 1,
    };

    return fixture;
  }

  public static get withNonAccomplishedOne(): MatchingAnalysisCriteriaResult {
    const fixture: MatchingAnalysisCriteriaResult = {
      ...this.withMandatory,
      nonAccomplished: 1,
    };

    return fixture;
  }

  public static get withUnansweredOne(): MatchingAnalysisCriteriaResult {
    const fixture: MatchingAnalysisCriteriaResult = {
      ...this.withMandatory,
      unanswered: 1,
    };

    return fixture;
  }
}
