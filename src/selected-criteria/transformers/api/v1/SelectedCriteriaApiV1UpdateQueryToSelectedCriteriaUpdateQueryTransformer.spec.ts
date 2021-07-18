import 'reflect-metadata';

import { SelectedCriteriaApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/SelectedCriteriaApiV1UpdateQueryFixtures';
import { SelectedCriteriaUpdateQueryFixtures } from '../../../fixtures/domain/SelectedCriteriaUpdateQueryFixtures';
import { SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer } from './SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer';

describe('SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer', () => {
  let selectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer: SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer;

  beforeAll(() => {
    selectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer =
      new SelectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await selectedCriteriaApiV1UpdateQueryToSelectedCriteriaUpdateQueryTransformer.transform(
            SelectedCriteriaApiV1UpdateQueryFixtures.withMandatory,
          );
      });

      it('should return a SelectedCriteriaUpdateQuery', () => {
        expect(result).toStrictEqual(
          SelectedCriteriaUpdateQueryFixtures.withMandatory,
        );
      });
    });
  });
});
