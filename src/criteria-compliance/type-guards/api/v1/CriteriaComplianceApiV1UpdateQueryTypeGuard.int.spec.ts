import 'reflect-metadata';

import { AjvService } from '../../../../ajv/modules/AjvService';
import { CriteriaComplianceApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/CriteriaComplianceApiV1UpdateQueryFixtures';
import { CriteriaComplianceApiV1UpdateQueryTypeGuard } from './CriteriaComplianceApiV1UpdateQueryTypeGuard';

describe('CriteriaComplianceApiV1UpdateQueryTypeGuard integration', () => {
  let criteriaComplianceApiV1UpdateQueryTypeGuard: CriteriaComplianceApiV1UpdateQueryTypeGuard;

  describe('with ajv library', () => {
    beforeAll(() => {
      const ajvService: AjvService = new AjvService();

      criteriaComplianceApiV1UpdateQueryTypeGuard =
        new CriteriaComplianceApiV1UpdateQueryTypeGuard(ajvService);
    });

    describe('.is()', () => {
      describe('having a valid CriteriaComplianceApiV1UpdateQuery', () => {
        describe('when called', () => {
          let result: unknown;

          beforeAll(() => {
            result = criteriaComplianceApiV1UpdateQueryTypeGuard.is(
              CriteriaComplianceApiV1UpdateQueryFixtures.withAll,
            );
          });

          it('should return true', () => {
            expect(result).toBe(true);
          });
        });
      });

      describe('having a CriteriaComplianceApiV1UpdateQuery with invalid contract', () => {
        describe('when called', () => {
          let result: unknown;

          beforeAll(() => {
            result = criteriaComplianceApiV1UpdateQueryTypeGuard.is(
              CriteriaComplianceApiV1UpdateQueryFixtures.withInvalidContract,
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
