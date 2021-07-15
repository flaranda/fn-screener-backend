import 'reflect-metadata';

import { CriteriaApiV1Fixtures } from '../../../fixtures/api/v1/CriteriaApiV1Fixtures';
import { CriteriaFixtures } from '../../../fixtures/domain/CriteriaFixtures';
import { CriteriaToCriteriaApiV1Transformer } from './CriteriaToCriteriaApiV1Transformer';

describe('CriteriaToCriteriaApiV1Transformer', () => {
  let criteriaToCriteriaApiV1Transformer: CriteriaToCriteriaApiV1Transformer;

  beforeAll(() => {
    criteriaToCriteriaApiV1Transformer =
      new CriteriaToCriteriaApiV1Transformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await criteriaToCriteriaApiV1Transformer.transform(
          CriteriaFixtures.withMandatory,
        );
      });

      it('should returns a CriteriaApiV1', () => {
        expect(result).toStrictEqual(CriteriaApiV1Fixtures.withMandatory);
      });
    });
  });
});
