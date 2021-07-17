import 'reflect-metadata';

import express from 'express';

import { ExpressRequest } from '../../models/express/ExpressRequest';
import { ExpressRequestHandler } from './ExpressRequestHandler';

class ExpressRequestHandlerMock extends ExpressRequestHandler {
  constructor(public readonly handleMock: jest.Mock) {
    super();
  }

  protected async handle(
    request: ExpressRequest,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    await this.handleMock(request, response, next);
    next();
  }
}

describe('ExpressRequestHandler', () => {
  let handleMock: jest.Mock;

  let requestHandler: ExpressRequestHandlerMock;

  beforeAll(() => {
    handleMock = jest.fn().mockResolvedValue(undefined);

    requestHandler = new ExpressRequestHandlerMock(handleMock);
  });

  describe('.handler()', () => {
    describe('when called', () => {
      let requestFixture: ExpressRequest;
      let responseFixture: express.Response;
      let nextFunctionMock: express.NextFunction;

      // eslint-disable-next-line jest/no-done-callback
      beforeAll((done: jest.DoneCallback) => {
        requestFixture = {} as ExpressRequest;
        responseFixture = {} as express.Response;
        nextFunctionMock = jest.fn().mockImplementationOnce(() => {
          done();
        });

        requestHandler.handler(
          requestFixture,
          responseFixture,
          nextFunctionMock,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call RequestHandler.handle()', () => {
        expect(requestHandler.handleMock).toHaveBeenCalledTimes(1);
        expect(requestHandler.handleMock).toHaveBeenCalledWith(
          requestFixture,
          responseFixture,
          nextFunctionMock,
        );
      });
    });

    describe('when called, and the handler fails', () => {
      let requestFixture: ExpressRequest;
      let responseFixture: express.Response;
      let nextFunctionMock: express.NextFunction;

      let handlerErrorFixture: Error;

      // eslint-disable-next-line jest/no-done-callback
      beforeAll((done: jest.DoneCallback) => {
        requestFixture = {} as ExpressRequest;
        responseFixture = {} as express.Response;
        nextFunctionMock = jest.fn().mockImplementationOnce(() => {
          done();
        });

        handlerErrorFixture = new Error('Error fixture');

        handleMock.mockRejectedValueOnce(handlerErrorFixture);

        requestHandler.handler(
          requestFixture,
          responseFixture,
          nextFunctionMock,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call RequestHandler.handle()', () => {
        expect(requestHandler.handleMock).toHaveBeenCalledTimes(1);
        expect(requestHandler.handleMock).toHaveBeenCalledWith(
          requestFixture,
          responseFixture,
          nextFunctionMock,
        );
      });

      it('should call nextFunctionMock()', () => {
        expect(nextFunctionMock).toHaveBeenCalledTimes(1);
        expect(nextFunctionMock).toHaveBeenCalledWith(handlerErrorFixture);
      });
    });
  });
});
