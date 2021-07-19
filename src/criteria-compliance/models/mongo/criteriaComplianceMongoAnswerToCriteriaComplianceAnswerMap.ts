import { CriteriaComplianceAnswer } from '../domain/CriteriaComplianceAnswer';
import { CriteriaComplianceMongoAnswer } from './CriteriaComplianceMongoAnswer';

export const criteriaComplianceMongoAnswerToCriteriaComplianceAnswerMap: {
  [TKey in CriteriaComplianceMongoAnswer]: CriteriaComplianceAnswer;
} = {
  [CriteriaComplianceMongoAnswer.no]: CriteriaComplianceAnswer.No,
  [CriteriaComplianceMongoAnswer.no_answer]: CriteriaComplianceAnswer.NoAnswer,
  [CriteriaComplianceMongoAnswer.yes]: CriteriaComplianceAnswer.Yes,
};
