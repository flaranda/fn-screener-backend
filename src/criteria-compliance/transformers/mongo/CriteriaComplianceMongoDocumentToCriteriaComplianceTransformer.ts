import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';
import { criteriaComplianceMongoAnswerToCriteriaComplianceAnswerMap } from '../../models/mongo/criteriaComplianceMongoAnswerToCriteriaComplianceAnswerMap';
import { CriteriaComplianceMongoDocument } from '../../models/mongo/CriteriaComplianceMongoDocument';

@inversify.injectable()
export class CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer
  implements ITransformer<CriteriaComplianceMongoDocument, CriteriaCompliance>
{
  public async transform(
    criteriaComplianceMongoDocument: CriteriaComplianceMongoDocument,
  ): Promise<CriteriaCompliance> {
    const criteriaCompliance: CriteriaCompliance = {
      answer:
        criteriaComplianceMongoAnswerToCriteriaComplianceAnswerMap[
          criteriaComplianceMongoDocument.answer
        ],
      createdAt: criteriaComplianceMongoDocument.created_at,
      criteriaUuid: criteriaComplianceMongoDocument.criteria_uuid,
      startupUuid: criteriaComplianceMongoDocument.startup_uuid,
      updatedAt: criteriaComplianceMongoDocument.updated_at,
      uuid: criteriaComplianceMongoDocument.uuid,
    };

    return criteriaCompliance;
  }
}
