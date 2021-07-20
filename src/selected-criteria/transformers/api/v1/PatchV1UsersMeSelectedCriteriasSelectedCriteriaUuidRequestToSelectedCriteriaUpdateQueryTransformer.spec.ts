import 'reflect-metadata';

import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { SelectedCriteriaApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/SelectedCriteriaApiV1UpdateQueryFixtures';
import { SelectedCriteriaFixtures } from '../../../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaUpdateQueryFixtures } from '../../../fixtures/domain/SelectedCriteriaUpdateQueryFixtures';
import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';
import { PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer } from './PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer';

describe('PatchV1SelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer', () => {
  let patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser: jest.Mocked<
    IRequestParser<SelectedCriteriaApiV1UpdateQuery>
  >;

  let patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer: PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer;

  beforeAll(() => {
    patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser = {
      parse: jest.fn(),
    };

    patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer =
      new PatchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer(
        patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser,
      );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser.parse.mockResolvedValue(
        SelectedCriteriaApiV1UpdateQueryFixtures.withAll,
      );
    });

    describe('having a Request with selectedCriteria', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {
          selectedCriteria: SelectedCriteriaFixtures.withMandatory,
        };

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result =
            await patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.transform(
              requestFixture,
            );
        });

        it('should call PatchV1SelectedCriteriasSelectedCriteriaUuidRequestParser.parse()', () => {
          expect(
            patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser.parse,
          ).toHaveBeenCalledTimes(1);
          expect(
            patchV1SelectedCriteriasSelectedCriteriaUuidRequestParser.parse,
          ).toHaveBeenCalledWith(requestFixture);
        });

        it('should return a SelectedCriteriaUpdateQuery', () => {
          expect(result).toStrictEqual(
            SelectedCriteriaUpdateQueryFixtures.withImportance,
          );
        });
      });
    });

    describe('having a Request without selectedCriteria', () => {
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
            await patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.transform(
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
