import { MatchingApiV1AnalysisCriteriaResult } from './MatchingApiV1AnalysisCriteriaResult';

export interface MatchingApiV1Analysis {
  readonly score: number;
  readonly must_have_criteria_result: MatchingApiV1AnalysisCriteriaResult;
  readonly nice_to_have_criteria_result: MatchingApiV1AnalysisCriteriaResult;
  readonly super_nice_to_have_criteria_result: MatchingApiV1AnalysisCriteriaResult;
}
