import 'reflect-metadata';

import { CriteriaFixtures } from '../../fixtures/domain/CriteriaFixtures';
import { CriteriaMongoDocumentFixtures } from '../../fixtures/mongo/CriteriaMongoDocumentFixtures';
import { CriteriaMongoDocumentToCriteriaTransformer } from './CriteriaMongoDocumentToCriteriaTransformer';

describe('CriteriaMongoDocumentToCriteriaTransformer', () => {
  let criteriaMongoDocumentToCriteriaTransformer: CriteriaMongoDocumentToCriteriaTransformer;

  beforeAll(() => {
    criteriaMongoDocumentToCriteriaTransformer =
      new CriteriaMongoDocumentToCriteriaTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await criteriaMongoDocumentToCriteriaTransformer.transform(
          CriteriaMongoDocumentFixtures.withMandatory,
        );
      });

      it('should returns a Criteria', () => {
        expect(result).toStrictEqual(CriteriaFixtures.withMandatory);
      });
    });
  });
});
