import 'reflect-metadata';

import express from 'express';

import { RequestWithContext } from '../models/RequestWithContext';
import { ExpressRequestParamHandler } from './ExpressRequestParamHandler';

class ExpressRequestParamHandlerMock extends ExpressRequestParamHandler {
  constructor(public readonly handleMock: jest.Mock) {
    super();
  }

  protected async handle(
    request: RequestWithContext,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    this.handleMock(request, response, next);
  }
}

describe('RequestParamHandler', () => {
  let expressRequestParamHandler: ExpressRequestParamHandlerMock;

  beforeAll(() => {
    expressRequestParamHandler = new ExpressRequestParamHandlerMock(jest.fn());
  });

  describe('.handler()', () => {
    describe('when called', () => {
      beforeAll(() => {
        expressRequestParamHandler.handler(
          {} as RequestWithContext,
          {} as express.Response,
          jest.fn(),
          'paramValue',
          'paramName',
        );
      });

      it('should call expressRequestParamHandler.handleMock()', () => {
        expect(expressRequestParamHandler.handleMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
