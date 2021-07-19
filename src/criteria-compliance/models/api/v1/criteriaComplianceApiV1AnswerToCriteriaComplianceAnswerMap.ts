import { CriteriaComplianceAnswer } from '../../domain/CriteriaComplianceAnswer';
import { CriteriaComplianceApiV1Answer } from './CriteriaComplianceApiV1Answer';

export const criteriaComplianceApiV1AnswerToCriteriaComplianceAnswerMap: {
  [TKey in CriteriaComplianceApiV1Answer]: CriteriaComplianceAnswer;
} = {
  [CriteriaComplianceApiV1Answer.no]: CriteriaComplianceAnswer.No,
  [CriteriaComplianceApiV1Answer.no_answer]: CriteriaComplianceAnswer.NoAnswer,
  [CriteriaComplianceApiV1Answer.yes]: CriteriaComplianceAnswer.Yes,
};
