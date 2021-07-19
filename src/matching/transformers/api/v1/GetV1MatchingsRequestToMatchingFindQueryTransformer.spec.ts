import 'reflect-metadata';

import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { UserFixtures } from '../../../../user/fixtures/domain/UserFixtures';
import { MatchingFindQueryFixtures } from '../../../fixtures/domain/MatchingFindQueryFixtures';
import { GetV1MatchingsRequestToMatchingFindQueryTransformer } from './GetV1MatchingsRequestToMatchingFindQueryTransformer';

describe('GetV1MatchingsRequestToMatchingFindQueryTransformer', () => {
  let getV1MatchingsRequestToMatchingFindQueryTransformer: GetV1MatchingsRequestToMatchingFindQueryTransformer;

  beforeAll(() => {
    getV1MatchingsRequestToMatchingFindQueryTransformer =
      new GetV1MatchingsRequestToMatchingFindQueryTransformer();
  });

  describe('.transform()', () => {
    describe('having a Request with user', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {
          user: UserFixtures.withMandatory,
        };

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as Partial<RequestWithContext> as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result =
            await getV1MatchingsRequestToMatchingFindQueryTransformer.transform(
              requestFixture,
            );
        });

        it('should return a MatchingFindQuery', () => {
          expect(result).toStrictEqual(MatchingFindQueryFixtures.withUserUuid);
        });
      });
    });

    describe('having a Request without user', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {};

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as Partial<RequestWithContext> as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          try {
            await getV1MatchingsRequestToMatchingFindQueryTransformer.transform(
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
