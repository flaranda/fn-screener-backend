import 'reflect-metadata';

import { IRequestParser } from '../../common/interfaces/IRequestParser';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { CriteriaComplianceApiV1UpdateQueryFixtures } from '../fixtures/api/v1/CriteriaComplianceApiV1UpdateQueryFixtures';
import { CriteriaComplianceFixtures } from '../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceUpdateQueryFixtures } from '../fixtures/domain/CriteriaComplianceUpdateQueryFixtures';
import { CriteriaComplianceApiV1UpdateQuery } from '../models/api/v1/CriteriaComplianceApiV1UpdateQuery';
import { PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer } from '../transformers/api/v1/PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer';

describe('PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer', () => {
  let patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser: jest.Mocked<
    IRequestParser<CriteriaComplianceApiV1UpdateQuery>
  >;

  let patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer: PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer;

  beforeAll(() => {
    patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser = {
      parse: jest.fn(),
    };

    patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer =
      new PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer(
        patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser,
      );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse.mockResolvedValue(
        CriteriaComplianceApiV1UpdateQueryFixtures.withAll,
      );
    });

    describe('having a Request with criteriaCompliance', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {
          criteriaCompliance: CriteriaComplianceFixtures.withMandatory,
        };

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result =
            await patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer.transform(
              requestFixture,
            );
        });

        it('should call PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse()', () => {
          expect(
            patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse,
          ).toHaveBeenCalledTimes(1);
          expect(
            patchV1CriteriaCompliancesCriteriaComplianceUuidRequestParser.parse,
          ).toHaveBeenCalledWith(requestFixture);
        });

        it('should return a CriteriaComplianceUpdateQuery', () => {
          expect(result).toStrictEqual(
            CriteriaComplianceUpdateQueryFixtures.withAnswer,
          );
        });
      });
    });

    describe('having a Request without matching', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {};

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          try {
            await patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer.transform(
              requestFixture,
            );
          } catch (error: unknown) {
            result = error;
          }
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
        });
      });
    });
  });
});
