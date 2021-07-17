import 'reflect-metadata';

import { SelectedCriteriaFixtures } from '../../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaMongoDocumentFixtures } from '../../fixtures/mongo/SelectedCriteriaMongoDocumentFixtures';
import { SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer } from './SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer';

describe('SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer', () => {
  let selectedCriteriaMongoDocumentToSelectedCriteriaTransformer: SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer;

  beforeAll(() => {
    selectedCriteriaMongoDocumentToSelectedCriteriaTransformer =
      new SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await selectedCriteriaMongoDocumentToSelectedCriteriaTransformer.transform(
            SelectedCriteriaMongoDocumentFixtures.withMandatory,
          );
      });

      it('should return a SelectedCriteria', () => {
        expect(result).toStrictEqual(SelectedCriteriaFixtures.withMandatory);
      });
    });
  });
});
