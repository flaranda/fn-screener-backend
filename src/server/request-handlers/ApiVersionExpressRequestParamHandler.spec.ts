import 'reflect-metadata';

import express from 'express';

import { RequestContextFixtures } from '../../common/fixtures/domain/RequestContextFixtures';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../models/RequestWithContext';
import { ApiVersionExpressRequestParamHandler } from './ApiVersionExpressRequestParamHandler';

describe('ApiVersionExpressRequestParamHandler', () => {
  let apiVersionExpressRequestParamHandler: ApiVersionExpressRequestParamHandler;

  beforeAll(() => {
    apiVersionExpressRequestParamHandler =
      new ApiVersionExpressRequestParamHandler();
  });

  describe('.handler()', () => {
    let apiVersionParamNameFixture: string;
    let responseFixture: express.Response;

    beforeAll(() => {
      apiVersionParamNameFixture = 'apiVersion';
      responseFixture = {} as express.Response;
    });

    describe('when called', () => {
      let requestFixture: RequestWithContext;
      let nextMock: express.NextFunction;

      // eslint-disable-next-line jest/no-done-callback
      beforeAll((done: jest.DoneCallback) => {
        requestFixture = {
          [requestContextSymbol]: {},
        } as RequestWithContext;

        nextMock = jest.fn().mockImplementation(() => {
          done();
        });

        apiVersionExpressRequestParamHandler.handler(
          requestFixture,
          responseFixture,
          nextMock,
          ApiVersion.v1,
          apiVersionParamNameFixture,
        );
      });

      it('should populate RequestContext with ApiVersion', () => {
        expect(requestFixture[requestContextSymbol]).toStrictEqual(
          RequestContextFixtures.withApiVersion,
        );
      });

      it('should call nextMock()', () => {
        expect(nextMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('having an invalid apiVersion param', () => {
      let requestFixture: RequestWithContext;
      let invalidApiVersionParamFixture: string;

      beforeAll(() => {
        requestFixture = {
          [requestContextSymbol]: {},
        } as RequestWithContext;

        invalidApiVersionParamFixture = 'v0';
      });

      describe('when called', () => {
        let nextMock: express.NextFunction;

        // eslint-disable-next-line jest/no-done-callback
        beforeAll((done: jest.DoneCallback) => {
          nextMock = jest.fn().mockImplementation(() => {
            done();
          });

          apiVersionExpressRequestParamHandler.handler(
            requestFixture,
            responseFixture,
            nextMock,
            invalidApiVersionParamFixture,
            apiVersionParamNameFixture,
          );
        });

        it('should not populate RequestContext with ApiVersion', () => {
          expect(requestFixture[requestContextSymbol]).not.toHaveProperty(
            apiVersionParamNameFixture,
          );
        });

        it('should call nextMock() with an error', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
          expect(nextMock).toHaveBeenCalledWith(expect.any(Error));
        });
      });
    });
  });
});
