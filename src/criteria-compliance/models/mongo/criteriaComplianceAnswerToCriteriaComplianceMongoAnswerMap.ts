import { CriteriaComplianceAnswer } from '../domain/CriteriaComplianceAnswer';
import { CriteriaComplianceMongoAnswer } from './CriteriaComplianceMongoAnswer';

export const criteriaComplianceAnswerToCriteriaComplianceMongoAnswerMap: {
  [TKey in CriteriaComplianceAnswer]: CriteriaComplianceMongoAnswer;
} = {
  [CriteriaComplianceAnswer.No]: CriteriaComplianceMongoAnswer.no,
  [CriteriaComplianceAnswer.NoAnswer]: CriteriaComplianceMongoAnswer.no_answer,
  [CriteriaComplianceAnswer.Yes]: CriteriaComplianceMongoAnswer.yes,
};
