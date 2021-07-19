import 'reflect-metadata';

import { AjvService } from '../../../../ajv/modules/AjvService';
import { MatchingApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/MatchingApiV1UpdateQueryFixtures';
import { MatchingApiV1UpdateQueryTypeGuard } from './MatchingApiV1UpdateQueryTypeGuard';

describe('MatchingApiV1UpdateQueryTypeGuard integration', () => {
  let matchingApiV1UpdateQueryTypeGuard: MatchingApiV1UpdateQueryTypeGuard;

  describe('with ajv library', () => {
    beforeAll(() => {
      const ajvService: AjvService = new AjvService();

      matchingApiV1UpdateQueryTypeGuard = new MatchingApiV1UpdateQueryTypeGuard(
        ajvService,
      );
    });

    describe('.is()', () => {
      describe('having a valid MatchingApiV1UpdateQuery', () => {
        describe('when called', () => {
          let result: unknown;

          beforeAll(() => {
            result = matchingApiV1UpdateQueryTypeGuard.is(
              MatchingApiV1UpdateQueryFixtures.withAll,
            );
          });

          it('should return true', () => {
            expect(result).toBe(true);
          });
        });
      });

      describe('having a MatchingApiV1UpdateQuery with invalid contract', () => {
        describe('when called', () => {
          let result: unknown;

          beforeAll(() => {
            result = matchingApiV1UpdateQueryTypeGuard.is(
              MatchingApiV1UpdateQueryFixtures.withInvalidContract,
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
