import { MatchingAnalysis } from '../../models/domain/MatchingAnalysis';
import { MatchingAnalysisCriteriaResultFixture } from './MatchingAnalysisCriteriaResultFixture';

export class MatchingAnalysisFixtures {
  public static get withMandatory(): MatchingAnalysis {
    const fixture: MatchingAnalysis = {
      mustHaveCriteriaResult:
        MatchingAnalysisCriteriaResultFixture.withMandatory,
      niceToHaveCriteriaResult:
        MatchingAnalysisCriteriaResultFixture.withMandatory,
      score: 0,
      superNiceToHaveCriteriaResult:
        MatchingAnalysisCriteriaResultFixture.withMandatory,
    };

    return fixture;
  }

  public static get withFixedValues(): MatchingAnalysis {
    const fixture: MatchingAnalysis = {
      mustHaveCriteriaResult:
        MatchingAnalysisCriteriaResultFixture.withAccomplishedOne,
      niceToHaveCriteriaResult:
        MatchingAnalysisCriteriaResultFixture.withNonAccomplishedOne,
      score: 0.5,
      superNiceToHaveCriteriaResult:
        MatchingAnalysisCriteriaResultFixture.withUnansweredOne,
    };

    return fixture;
  }
}
