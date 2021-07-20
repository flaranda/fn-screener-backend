import 'reflect-metadata';

import { IRequestParser } from '../../../../common/interfaces/IRequestParser';
import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { MatchingApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/MatchingApiV1UpdateQueryFixtures';
import { MatchingFixtures } from '../../../fixtures/domain/MatchingFixtures';
import { MatchingUpdateQueryFixtures } from '../../../fixtures/domain/MatchingUpdateQueryFixtures';
import { MatchingApiV1UpdateQuery } from '../../../models/api/v1/MatchingApiV1UpdateQuery';
import { PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer } from './PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer';

describe('PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer', () => {
  let patchV1MatchingsMatchingUuidRequestParser: jest.Mocked<
    IRequestParser<MatchingApiV1UpdateQuery>
  >;

  let patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer: PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer;

  beforeAll(() => {
    patchV1MatchingsMatchingUuidRequestParser = {
      parse: jest.fn(),
    };

    patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer =
      new PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer(
        patchV1MatchingsMatchingUuidRequestParser,
      );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      patchV1MatchingsMatchingUuidRequestParser.parse.mockResolvedValue(
        MatchingApiV1UpdateQueryFixtures.withAll,
      );
    });

    describe('having a Request with matching', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {
          matching: MatchingFixtures.withMandatory,
        };

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result =
            await patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.transform(
              requestFixture,
            );
        });

        it('should call PatchV1MatchingsMatchingUuidRequestParser.parse()', () => {
          expect(
            patchV1MatchingsMatchingUuidRequestParser.parse,
          ).toHaveBeenCalledTimes(1);
          expect(
            patchV1MatchingsMatchingUuidRequestParser.parse,
          ).toHaveBeenCalledWith(requestFixture);
        });

        it('should return a MatchingUpdateQuery', () => {
          expect(result).toStrictEqual(MatchingUpdateQueryFixtures.withStatus);
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
            await patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.transform(
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
