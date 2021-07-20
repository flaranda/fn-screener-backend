import 'reflect-metadata';

import { RequestContext } from '../../../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { StartupFixtures } from '../../../../startup/fixtures/domain/StartupFixtures';
import { CriteriaComplianceFindQueryFixtures } from '../../../fixtures/domain/CriteriaComplianceFindQueryFixtures';
import { GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer } from './GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer';

describe('GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer', () => {
  let getV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer: GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer;

  beforeAll(() => {
    getV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer =
      new GetV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer();
  });

  describe('.transform()', () => {
    describe('having a Request with startup', () => {
      let requestContextFixture: RequestContext;
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestContextFixture = {
          startup: StartupFixtures.withMandatory,
        };

        requestFixture = {
          [requestContextSymbol]: requestContextFixture,
        } as Partial<RequestWithContext> as RequestWithContext;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result =
            await getV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform(
              requestFixture,
            );
        });

        it('should return a CriteriaComplianceFindQuery', () => {
          expect(result).toStrictEqual(
            CriteriaComplianceFindQueryFixtures.withStartupUuid,
          );
        });
      });
    });

    describe('having a Request without startup', () => {
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
            await getV1StartupsStartupUuidCriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform(
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
