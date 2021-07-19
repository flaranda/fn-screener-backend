import { CriteriaComplianceAnswer } from '../../domain/CriteriaComplianceAnswer';
import { CriteriaComplianceApiV1Answer } from './CriteriaComplianceApiV1Answer';

export const criteriaComplianceAnswerToCriteriaComplianceApiV1AnswerMap: {
  [TKey in CriteriaComplianceAnswer]: CriteriaComplianceApiV1Answer;
} = {
  [CriteriaComplianceAnswer.No]: CriteriaComplianceApiV1Answer.no,
  [CriteriaComplianceAnswer.NoAnswer]: CriteriaComplianceApiV1Answer.no_answer,
  [CriteriaComplianceAnswer.Yes]: CriteriaComplianceApiV1Answer.yes,
};
