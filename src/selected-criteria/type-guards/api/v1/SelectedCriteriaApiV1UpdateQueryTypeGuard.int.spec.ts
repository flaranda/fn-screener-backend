import 'reflect-metadata';

import { AjvService } from '../../../../ajv/modules/AjvService';
import { SelectedCriteriaApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/SelectedCriteriaApiV1UpdateQueryFixtures';
import { SelectedCriteriaApiV1UpdateQueryTypeGuard } from './SelectedCriteriaApiV1UpdateQueryTypeGuard';

describe('SelectedCriteriaApiV1UpdateQueryTypeGuard integration', () => {
  let selectedCriteriaApiV1UpdateQueryTypeGuard: SelectedCriteriaApiV1UpdateQueryTypeGuard;

  describe('with ajv library', () => {
    beforeAll(() => {
      const ajvService: AjvService = new AjvService();

      selectedCriteriaApiV1UpdateQueryTypeGuard =
        new SelectedCriteriaApiV1UpdateQueryTypeGuard(ajvService);
    });

    describe('.is()', () => {
      describe('having a valid SelectedCriteriaApiV1UpdateQuery', () => {
        describe('when called', () => {
          let result: unknown;

          beforeAll(() => {
            result = selectedCriteriaApiV1UpdateQueryTypeGuard.is(
              SelectedCriteriaApiV1UpdateQueryFixtures.withAll,
            );
          });

          it('should return true', () => {
            expect(result).toBe(true);
          });
        });
      });

      describe('having a SelectedCriteriaApiV1UpdateQuery with invalid contract', () => {
        describe('when called', () => {
          let result: unknown;

          beforeAll(() => {
            result = selectedCriteriaApiV1UpdateQueryTypeGuard.is(
              SelectedCriteriaApiV1UpdateQueryFixtures.withInvalidContract,
            );
          });

          it('should return false', () => {
            expect(result).toBe(false);
          });
        });
      });
    });
  });
});
