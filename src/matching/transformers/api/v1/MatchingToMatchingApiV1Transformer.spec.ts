import 'reflect-metadata';

import { MatchingApiV1Fixtures } from '../../../fixtures/api/v1/MatchingApiV1Fixtures';
import { MatchingFixtures } from '../../../fixtures/domain/MatchingFixtures';
import { MatchingToMatchingApiV1Transformer } from './MatchingToMatchingApiV1Transformer';

describe('MatchingToMatchingApiV1Transformer', () => {
  let matchingToMatchingApiV1Transformer: MatchingToMatchingApiV1Transformer;

  beforeAll(() => {
    matchingToMatchingApiV1Transformer =
      new MatchingToMatchingApiV1Transformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await matchingToMatchingApiV1Transformer.transform(
          MatchingFixtures.withMandatory,
        );
      });

      it('should return a MatchingApiV1', () => {
        expect(result).toStrictEqual(MatchingApiV1Fixtures.withMandatory);
      });
    });
  });
});
