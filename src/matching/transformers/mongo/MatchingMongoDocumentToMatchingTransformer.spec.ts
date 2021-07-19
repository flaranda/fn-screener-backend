import 'reflect-metadata';

import { MatchingFixtures } from '../../fixtures/domain/MatchingFixtures';
import { MatchingMongoDocumentFixtures } from '../../fixtures/mongo/MatchingMongoDocumentFixtures';
import { MatchingMongoDocumentToMatchingTransformer } from './MatchingMongoDocumentToMatchingTransformer';

describe('MatchingMongoDocumentToMatchingTransformer', () => {
  let matchingMongoDocumentToMatchingTransformer: MatchingMongoDocumentToMatchingTransformer;

  beforeAll(() => {
    matchingMongoDocumentToMatchingTransformer =
      new MatchingMongoDocumentToMatchingTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await matchingMongoDocumentToMatchingTransformer.transform(
          MatchingMongoDocumentFixtures.withMandatory,
        );
      });

      it('should return a Matching', () => {
        expect(result).toStrictEqual(MatchingFixtures.withMandatory);
      });
    });
  });
});
