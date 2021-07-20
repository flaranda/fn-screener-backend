import 'reflect-metadata';

import { ITypeGuard } from '../../../../common/interfaces/ITypeGuard';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { CriteriaComplianceApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/CriteriaComplianceApiV1UpdateQueryFixtures';
import { CriteriaComplianceApiV1UpdateQuery } from '../../../models/api/v1/CriteriaComplianceApiV1UpdateQuery';
import { PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser } from './PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser';

describe('PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser', () => {
  let criteriaComplianceApiV1UpdateQueryTypeGuard: jest.Mocked<
    ITypeGuard<CriteriaComplianceApiV1UpdateQuery>
  >;

  let patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser: PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser;

  beforeAll(() => {
    criteriaComplianceApiV1UpdateQueryTypeGuard = {
      is: jest.fn(),
    } as unknown as jest.Mocked<ITypeGuard<CriteriaComplianceApiV1UpdateQuery>>;

    patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser =
      new PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser(
        criteriaComplianceApiV1UpdateQueryTypeGuard,
      );
  });

  describe('.parse()', () => {
    let requestFixture: RequestWithContext;

    beforeAll(() => {
      criteriaComplianceApiV1UpdateQueryTypeGuard.is.mockReturnValue(true);

      requestFixture = {
        body: CriteriaComplianceApiV1UpdateQueryFixtures.withMandatory,
      } as Partial<RequestWithContext> as RequestWithContext;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse(
            requestFixture,
          );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call CriteriaComplianceApiV1UpdateQueryTypeGuard.is()', () => {
        expect(
          criteriaComplianceApiV1UpdateQueryTypeGuard.is,
        ).toHaveBeenCalledTimes(1);
        expect(
          criteriaComplianceApiV1UpdateQueryTypeGuard.is,
        ).toHaveBeenCalledWith(
          CriteriaComplianceApiV1UpdateQueryFixtures.withMandatory,
        );
      });

      it('should return a CriteriaComplianceApiV1UpdateQuery', () => {
        expect(result).toStrictEqual(
          CriteriaComplianceApiV1UpdateQueryFixtures.withMandatory,
        );
      });
    });

    describe('when called, and CriteriaComplianceApiV1UpdateQueryTypeGuard.is() returns false', () => {
      let result: unknown;

      beforeAll(async () => {
        criteriaComplianceApiV1UpdateQueryTypeGuard.is.mockReturnValueOnce(
          false,
        );

        try {
          await patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse(
            requestFixture,
          );
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call CriteriaComplianceApiV1UpdateQueryTypeGuard.is()', () => {
        expect(
          criteriaComplianceApiV1UpdateQueryTypeGuard.is,
        ).toHaveBeenCalledTimes(1);
        expect(
          criteriaComplianceApiV1UpdateQueryTypeGuard.is,
        ).toHaveBeenCalledWith(
          CriteriaComplianceApiV1UpdateQueryFixtures.withMandatory,
        );
      });

      it('should throw an Error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });
  });
});
