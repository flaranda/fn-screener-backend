import { MatchingAnalysisCriteriaResult } from './MatchingAnalysisCriteriaResult';

export interface MatchingAnalysis {
  readonly score: number;
  readonly mustHaveCriteriaResult: MatchingAnalysisCriteriaResult;
  readonly niceToHaveCriteriaResult: MatchingAnalysisCriteriaResult;
  readonly superNiceToHaveCriteriaResult: MatchingAnalysisCriteriaResult;
}
