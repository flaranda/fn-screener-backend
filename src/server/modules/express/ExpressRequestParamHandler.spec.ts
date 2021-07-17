import 'reflect-metadata';

import express from 'express';

import { ExpressRequest } from '../../models/express/ExpressRequest';
import { ExpressRequestParamHandler } from './ExpressRequestParamHandler';

class ExpressRequestParamHandlerMock extends ExpressRequestParamHandler {
  constructor(public readonly handleMock: jest.Mock) {
    super();
  }

  protected async handle(
    request: ExpressRequest,
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
          {} as ExpressRequest,
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
