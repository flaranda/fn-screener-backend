import 'reflect-metadata';

import { CriteriaComplianceFixtures } from '../../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceMongoDocumentFixtures } from '../../fixtures/mongo/CriteriaComplianceMongoDocumentFixtures';
import { CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer } from './CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer';

describe('CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer', () => {
  let criteriaComplianceMongoDocumentToCriteriaComplianceTransformer: CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer;

  beforeAll(() => {
    criteriaComplianceMongoDocumentToCriteriaComplianceTransformer =
      new CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await criteriaComplianceMongoDocumentToCriteriaComplianceTransformer.transform(
            CriteriaComplianceMongoDocumentFixtures.withMandatory,
          );
      });

      it('should return a CriteriaCompliance', () => {
        expect(result).toStrictEqual(CriteriaComplianceFixtures.withMandatory);
      });
    });
  });
});
