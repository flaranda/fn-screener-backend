import 'reflect-metadata';

import { RequestWithContext } from '../../server/models/RequestWithContext';
import { RequestContextFixtures } from '../fixtures/domain/RequestContextFixtures';
import { RequestContext } from '../models/domain/RequestContext';
import { requestContextSymbol } from '../models/domain/requestContextSymbol';
import { getRequestContext } from './getRequestContext';

describe('getRequestContext()', () => {
  describe('when called', () => {
    let requestFixture: RequestWithContext;
    let result: unknown;

    beforeAll(() => {
      requestFixture = {
        [requestContextSymbol]: RequestContextFixtures.withMandatory,
      } as RequestWithContext;

      result = getRequestContext(requestFixture);
    });

    it('should return the RequestContext', () => {
      expect(result).toStrictEqual(RequestContextFixtures.withMandatory);
    });
  });

  describe('having a Request with no RequestContext', () => {
    let requestFixture: RequestWithContext;
    let emptyRequestContextFixture: RequestContext;

    beforeAll(() => {
      requestFixture = {} as RequestWithContext;
      emptyRequestContextFixture = {};
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getRequestContext(requestFixture);
      });

      it('should add an empty RequestContext to the Request', () => {
        expect(requestFixture[requestContextSymbol]).toStrictEqual(
          emptyRequestContextFixture,
        );
      });

      it('should return the RequestContext', () => {
        expect(result).toStrictEqual(emptyRequestContextFixture);
      });
    });
  });
});
