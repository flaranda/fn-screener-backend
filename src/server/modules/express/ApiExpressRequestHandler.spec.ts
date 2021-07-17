import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { ApiVersion } from '../../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../../common/models/domain/requestContextSymbol';
import { ExpressRequest } from '../../models/express/ExpressRequest';
import { ApiExpressRequestHandler } from './ApiExpressRequestHandler';

class ApiExpressRequestHandlerMock extends ApiExpressRequestHandler {
  constructor(public readonly handleV1Mock: jest.Mock) {
    super();
  }

  protected async handleV1(
    request: ExpressRequest,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    await this.handleV1Mock(request, response);
    next();
  }
}

describe('ApiExpressRequestHandler', () => {
  let handleV1Mock: jest.Mock;

  let apiExpressRequestHandler: ApiExpressRequestHandlerMock;

  beforeAll(() => {
    let expressRouterMockHandler: express.RequestHandler | undefined =
      undefined;

    const expressRouterMock: jest.Mocked<express.Router> = jest
      .fn()
      .mockImplementation(
        (
          request: express.Request,
          response: express.Response,
          next: express.NextFunction,
        ) => {
          if (expressRouterMockHandler) {
            expressRouterMockHandler(request, response, next);
          }
        },
      ) as Partial<express.Router> as jest.Mocked<express.Router>;

    expressRouterMock.use = jest
      .fn()
      .mockImplementation(
        (handler: express.RequestHandler): express.RequestHandler => {
          expressRouterMockHandler = handler;

          return expressRouterMock;
        },
      );

    (express.Router as jest.Mock).mockReturnValue(expressRouterMock);

    handleV1Mock = jest.fn().mockResolvedValue(undefined);

    apiExpressRequestHandler = new ApiExpressRequestHandlerMock(handleV1Mock);
  });

  describe('.handler()', () => {
    let expressResponseMock: jest.Mocked<express.Response>;

    beforeAll(() => {
      expressResponseMock =
        {} as Partial<express.Response> as jest.Mocked<express.Response>;
    });

    describe('having an ExpressRequest with ApiVersion.v1', () => {
      let expressRequestMock: ExpressRequest;

      beforeAll(() => {
        expressRequestMock = {
          [requestContextSymbol]: {
            apiVersion: ApiVersion.v1,
          },
        } as ExpressRequest;
      });

      describe('when called', () => {
        // eslint-disable-next-line jest/no-done-callback
        beforeAll((done: jest.DoneCallback) => {
          apiExpressRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            () => {
              done();
            },
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call apiExpressRequestHandler.handleV1Mock()', () => {
          expect(apiExpressRequestHandler.handleV1Mock).toHaveBeenCalledTimes(
            1,
          );
          expect(apiExpressRequestHandler.handleV1Mock).toHaveBeenCalledWith(
            expressRequestMock,
            expressResponseMock,
          );
        });
      });
    });

    describe('having an ExpressRequest with no ApiVersion', () => {
      let expressRequestMock: ExpressRequest;

      beforeAll(() => {
        expressRequestMock = {
          [requestContextSymbol]: {},
        } as ExpressRequest;
      });

      describe('when called', () => {
        let expressNextFunctionMock: express.NextFunction;

        // eslint-disable-next-line jest/no-done-callback
        beforeAll((done: jest.DoneCallback) => {
          expressNextFunctionMock = jest.fn().mockImplementationOnce(() => {
            done();
          });

          apiExpressRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          );
        });

        it('should call expressNextFunctionMock() with an Error', () => {
          expect(expressNextFunctionMock).toHaveBeenCalledTimes(1);
          expect(expressNextFunctionMock).toHaveBeenCalledWith(
            expect.any(Error),
          );
        });
      });
    });
  });
});
