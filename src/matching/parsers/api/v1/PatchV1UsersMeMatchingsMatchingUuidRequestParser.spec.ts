import 'reflect-metadata';

import { ITypeGuard } from '../../../../common/interfaces/ITypeGuard';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { MatchingApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/MatchingApiV1UpdateQueryFixtures';
import { MatchingApiV1UpdateQuery } from '../../../models/api/v1/MatchingApiV1UpdateQuery';
import { PatchV1UsersMeMatchingsMatchingUuidRequestParser } from './PatchV1UsersMeMatchingsMatchingUuidRequestParser';

describe('PatchV1UsersMeMatchingsMatchingUuidRequestParser', () => {
  let matchingApiV1UpdateQueryTypeGuard: jest.Mocked<
    ITypeGuard<MatchingApiV1UpdateQuery>
  >;

  let patchV1UsersMeMatchingsMatchingUuidRequestParser: PatchV1UsersMeMatchingsMatchingUuidRequestParser;

  beforeAll(() => {
    matchingApiV1UpdateQueryTypeGuard = {
      is: jest.fn(),
    } as unknown as jest.Mocked<ITypeGuard<MatchingApiV1UpdateQuery>>;

    patchV1UsersMeMatchingsMatchingUuidRequestParser =
      new PatchV1UsersMeMatchingsMatchingUuidRequestParser(
        matchingApiV1UpdateQueryTypeGuard,
      );
  });

  describe('.parse()', () => {
    let requestFixture: RequestWithContext;

    beforeAll(() => {
      matchingApiV1UpdateQueryTypeGuard.is.mockReturnValue(true);

      requestFixture = {
        body: MatchingApiV1UpdateQueryFixtures.withMandatory,
      } as Partial<RequestWithContext> as RequestWithContext;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await patchV1UsersMeMatchingsMatchingUuidRequestParser.parse(
          requestFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call MatchingApiV1UpdateQueryTypeGuard.is()', () => {
        expect(matchingApiV1UpdateQueryTypeGuard.is).toHaveBeenCalledTimes(1);
        expect(matchingApiV1UpdateQueryTypeGuard.is).toHaveBeenCalledWith(
          MatchingApiV1UpdateQueryFixtures.withMandatory,
        );
      });

      it('should return a MatchingApiV1UpdateQuery', () => {
        expect(result).toStrictEqual(
          MatchingApiV1UpdateQueryFixtures.withMandatory,
        );
      });
    });

    describe('when called, and MatchingApiV1UpdateQueryTypeGuard.is() returns false', () => {
      let result: unknown;

      beforeAll(async () => {
        matchingApiV1UpdateQueryTypeGuard.is.mockReturnValueOnce(false);

        try {
          await patchV1UsersMeMatchingsMatchingUuidRequestParser.parse(
            requestFixture,
          );
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call MatchingApiV1UpdateQueryTypeGuard.is()', () => {
        expect(matchingApiV1UpdateQueryTypeGuard.is).toHaveBeenCalledTimes(1);
        expect(matchingApiV1UpdateQueryTypeGuard.is).toHaveBeenCalledWith(
          MatchingApiV1UpdateQueryFixtures.withMandatory,
        );
      });

      it('should throw an Error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });
  });
});
